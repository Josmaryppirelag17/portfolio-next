export abstract class AppError extends Error {
  abstract readonly code: string;
  abstract readonly statusCode: number;
  constructor(message: string) { super(message); this.name = this.constructor.name; }
}

export class NotFoundError extends AppError { code = "NOT_FOUND"; statusCode = 404; constructor(e: string, id?: string) { super(id ? `${e} "${id}" no encontrado` : `${e} no encontrado`); } }
export class ValidationError extends AppError { code = "VALIDATION_ERROR"; statusCode = 400; }
export class UnauthorizedError extends AppError { code = "UNAUTHORIZED"; statusCode = 401; constructor(m = "No autorizado") { super(m); } }
export class InternalError extends AppError { code = "INTERNAL_ERROR"; statusCode = 500; constructor(m = "Error interno") { super(m); } }
