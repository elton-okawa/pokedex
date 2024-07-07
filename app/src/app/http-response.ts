export type HttpResponse<T> = {
  loading: boolean;
  data: T | null;
  error: Error | null;
};
