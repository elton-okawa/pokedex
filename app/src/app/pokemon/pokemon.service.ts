import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { PokemonQuery, PokemonSummary } from './pokemon-summary';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
} from 'rxjs';

type RequestState = 'idle' | 'loading' | 'error';
type SearchParams = {
  name: string;
  offset?: number;
  limit?: number;
};

@Injectable({
  providedIn: 'root',
})
export class PokemonService implements OnDestroy {
  private pokemonQuerySource = new BehaviorSubject<PokemonQuery>({
    count: 0,
    results: [],
  });
  pokemonQuery$ = this.pokemonQuerySource.asObservable();

  private requestStateSource = new BehaviorSubject<RequestState>('idle');
  requestState$ = this.requestStateSource.asObservable();

  private searchParamsSource = new Subject<SearchParams>();
  private loadMoreParamsSource = new Subject<SearchParams>();

  constructor(private readonly http: HttpClient) {
    this.observeSearch();
    this.observeLoadMore();
  }

  private observeSearch() {
    this.searchParamsSource
      .pipe(
        debounceTime(500),
        distinctUntilChanged(this.compareSearchParams),
        switchMap((params) => {
          this.requestStateSource.next('loading');
          return this.http.get<PokemonQuery>('/api/pokemon', {
            params: new HttpParams({ fromObject: params }),
          });
        })
      )
      .subscribe({
        next: (query) => {
          this.requestStateSource.next('idle');
          this.pokemonQuerySource.next(query);
        },
        error: (error) => {
          this.requestStateSource.next('error');
          console.error('Something went wrong: ', error.message);
        },
      });
  }

  private observeLoadMore() {
    this.loadMoreParamsSource
      .pipe(
        debounceTime(500),
        distinctUntilChanged(this.compareSearchParams),
        switchMap((params) => {
          this.requestStateSource.next('loading');
          return this.http.get<PokemonQuery>('/api/pokemon', {
            params: new HttpParams({ fromObject: params }),
          });
        })
      )
      .subscribe({
        next: (query) => {
          this.requestStateSource.next('idle');

          this.pokemonQuerySource.next({
            count: query.count,
            results: [
              ...this.pokemonQuerySource.value.results,
              ...query.results,
            ],
          });
        },
        error: (error) => {
          this.requestStateSource.next('error');
          console.error('Something went wrong: ', error.message);
        },
      });
  }

  private compareSearchParams(first: SearchParams, second: SearchParams) {
    return (
      first.name === second.name &&
      first.limit === second.limit &&
      first.offset === second.offset
    );
  }

  protected pokemonList: PokemonSummary[] = [
    { id: 1, name: 'bulbasaur' },
    { id: 2, name: 'ivysaur' },
    { id: 3, name: 'venosaur' },
  ];

  getAllPokemon(): Observable<PokemonQuery> {
    return this.http.get<PokemonQuery>('/api/pokemon');
  }

  ngOnDestroy(): void {
    this.searchParamsSource.complete();
  }

  getPokemonById(id: number) {
    return this.pokemonList.find((pokemon) => pokemon.id === id);
  }

  search(params: SearchParams) {
    this.searchParamsSource.next(params);
  }

  loadMore(params: SearchParams) {
    this.loadMoreParamsSource.next(params);
  }
}
