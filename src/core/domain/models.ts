export interface Entity<TId = string> {
  readonly id: TId;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
export type Result<T, E = Error> = { success: true; value: T } | { success: false; error: E };
export function ok<T>(value: T): Result<T, never> {
  return { success: true, value };
}
export function err<E = Error>(error: E): Result<never, E> {
  return { success: false, error };
}
export type AsyncResult<T, E = Error> = Promise<Result<T, E>>;
export interface PaginationParams {
  page: number;
  limit: number;
}
export interface PaginatedResult<T> {
  items: readonly T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
