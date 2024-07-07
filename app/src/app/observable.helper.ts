import { Observable, map, catchError, of, startWith } from 'rxjs';
import { HttpResponse } from './http-response';

export function withHttpResponse<T>() {
  return (o: Observable<any>): Observable<HttpResponse<T>> =>
    o.pipe(
      map((data: T) => ({ loading: false, data, error: null })),
      catchError((error) => of({ loading: false, error, data: null })),
      startWith({ loading: true, error: null, data: null })
    );
}
