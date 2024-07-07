import { Injectable } from '@angular/core';
import { PokemonDetails, PokemonQuery } from './pokemon';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
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
import { withHttpResponse } from '../observable.helper';

export type SearchParams = {
  search: {
    name: string;
    offset?: number;
    limit?: number;
  };
  append?: boolean;
  prev: HttpResponse<PokemonQuery>;
};

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private readonly http: HttpClient) {}

  private compareSearchParams(first: SearchParams, second: SearchParams) {
    return (
      first.search.name === second.search.name &&
      first.search.limit === second.search.limit &&
      first.search.offset === second.search.offset
    );
  }

  getAllPokemon(): Observable<PokemonQuery> {
    return this.http.get<PokemonQuery>('/api/pokemon');
  }

  searchPokemon(subject: Subject<SearchParams>) {
    return subject.pipe(
      debounceTime(500),
      distinctUntilChanged(this.compareSearchParams),
      switchMap((params) => {
        return this.http
          .get<PokemonQuery>('/api/pokemon', {
            params: new HttpParams({
              fromObject: params.search,
            }),
          })
          .pipe(
            map((query) => {
              if (params.append) {
                return {
                  count: query.count,
                  results: [
                    ...(params.prev.data?.results ?? []),
                    ...query.results,
                  ],
                };
              }

              return query;
            })
          );
      }),
      withHttpResponse<PokemonQuery>()
    );
  }

  getPokemonById(id: number): Observable<HttpResponse<PokemonDetails>> {
    return this.http.get<PokemonDetails>(`/api/pokemon/${id}`).pipe(
      map((data) => ({ loading: false, data, error: null })),
      catchError((error: Error) => of({ loading: false, error, data: null })),
      startWith({ loading: true, error: null, data: null })
    );
  }
}
