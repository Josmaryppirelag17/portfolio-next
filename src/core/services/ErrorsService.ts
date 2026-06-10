import { NextResponse } from "next/server";

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiResponseBody<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  errors?: string[];
}

export function badRequest(message: string, details?: unknown): NextResponse {
  return NextResponse.json(
    { success: false, error: { code: "BAD_REQUEST", message, details } },
    { status: 400 }
  );
}

export function unauthorized(message = "Authentication required"): NextResponse {
  return NextResponse.json(
    { success: false, error: { code: "UNAUTHORIZED", message } },
    { status: 401 }
  );
}

export function forbidden(message = "Access denied"): NextResponse {
  return NextResponse.json(
    { success: false, error: { code: "FORBIDDEN", message } },
    { status: 403 }
  );
}

export function notFound(message = "Resource not found"): NextResponse {
  return NextResponse.json(
    { success: false, error: { code: "NOT_FOUND", message } },
    { status: 404 }
  );
}

export function tooManyRequests(retryAfter: number, message = "Too many requests"): NextResponse {
  return NextResponse.json(
    { success: false, error: { code: "RATE_LIMITED", message, details: { retryAfter } } },
    { status: 429, headers: { "Retry-After": String(retryAfter) } }
  );
}

export function methodNotAllowed(message = "Method not allowed"): NextResponse {
  return NextResponse.json(
    { success: false, error: { code: "METHOD_NOT_ALLOWED", message } },
    { status: 405 }
  );
}

export function serverError(message = "Internal server error", errors?: string[]): NextResponse {
  return NextResponse.json(
    { success: false, error: { code: "INTERNAL_ERROR", message }, errors },
    { status: 500 }
  );
}

export function ok<T>(data: T): NextResponse {
  return NextResponse.json({ success: true, data }, { status: 200 });
}

export class ErrorsService {
  static badRequest = badRequest;
  static unauthorized = unauthorized;
  static forbidden = forbidden;
  static notFound = notFound;
  static tooManyRequests = tooManyRequests;
  static methodNotAllowed = methodNotAllowed;
  static serverError = serverError;
  static ok = ok;
}
