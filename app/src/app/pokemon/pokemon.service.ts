import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { PokemonDetails, PokemonQuery, PokemonSummary } from './pokemon';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';
import { HttpResponse } from '../http-response';

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

  getAllPokemon(): Observable<PokemonQuery> {
    return this.http.get<PokemonQuery>('/api/pokemon');
  }

  getPokemonById(id: number): Observable<HttpResponse<PokemonDetails>> {
    return this.http.get<PokemonDetails>(`/api/pokemon/${id}`).pipe(
      map((data) => ({ loading: false, data, error: null })),
      catchError((error: Error) => of({ loading: false, error, data: null })),
      startWith({ loading: true, error: null, data: null })
    );
  }

  ngOnDestroy(): void {
    this.searchParamsSource.complete();
  }

  search(params: SearchParams) {
    this.searchParamsSource.next(params);
  }

  loadMore(params: SearchParams) {
    this.loadMoreParamsSource.next(params);
  }
}
