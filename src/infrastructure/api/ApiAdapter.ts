import type { AsyncResult } from "@core/domain/models";
import { AppError, InternalError } from "@core/domain/errors";
import { err, ok } from "@core/domain/models";

class ApiError extends AppError {
  readonly code = "API_ERROR";
  readonly statusCode: number;
  constructor(status: number, statusText: string) {
    super(`Error ${status}: ${statusText}`);
    this.statusCode = status;
  }
}

export class ApiAdapter {
  private baseURL: string;

  constructor(baseURL: string = process.env.API_URL || "http://localhost:3000/api") {
    this.baseURL = baseURL;
  }

  async get<T>(path: string, params?: Record<string, string>): AsyncResult<T, AppError> {
    try {
      const url = new URL(path, this.baseURL);
      if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
      const res = await fetch(url.toString(), { headers: this.defaultHeaders() });
      if (!res.ok) return err(this.handleError(res));
      return ok(await res.json() as T);
    } catch (e) { return err(new InternalError("Error en API: " + (e instanceof Error ? e.message : String(e)))); }
  }

  async post<T>(path: string, body: unknown): AsyncResult<T, AppError> {
    try {
      const res = await fetch(new URL(path, this.baseURL).toString(), { method: "POST", headers: this.defaultHeaders(), body: JSON.stringify(body) });
      if (!res.ok) return err(this.handleError(res));
      return ok(await res.json() as T);
    } catch (e) { return err(new InternalError("Error en API: " + (e instanceof Error ? e.message : String(e)))); }
  }

  private defaultHeaders(): Record<string, string> { return { "Content-Type": "application/json", "Accept": "application/json" }; }
  private handleError(res: globalThis.Response): AppError { return new ApiError(res.status, res.statusText); }
}

export const apiAdapter = new ApiAdapter();
