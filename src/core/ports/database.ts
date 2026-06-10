import type { AsyncResult, PaginatedResult, PaginationParams } from "../domain/models";
import type { AppError } from "../domain/errors";

export interface DatabasePort { connect(): Promise<void>; disconnect(): Promise<void>; healthCheck(): Promise<boolean>; transaction<T>(fn: (tx: TransactionPort) => Promise<T>): AsyncResult<T, AppError>; }
export interface TransactionPort { getRepository<T extends Record<string, unknown>>(name: string): RepositoryPort<T>; }
export interface RepositoryPort<T extends Record<string, unknown>> { findById(id: string): AsyncResult<T | null, AppError>; findMany(params: PaginationParams): AsyncResult<PaginatedResult<T>, AppError>; create(data: Partial<T>): AsyncResult<T, AppError>; update(id: string, data: Partial<T>): AsyncResult<T, AppError>; delete(id: string): AsyncResult<boolean, AppError>; count(filters?: Record<string, unknown>): AsyncResult<number, AppError>; }
