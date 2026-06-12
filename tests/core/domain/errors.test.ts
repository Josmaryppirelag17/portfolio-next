import { describe, it, expect } from "vitest";
import {
  AppError,
  NotFoundError,
  ValidationError,
  UnauthorizedError,
  InternalError,
} from "@/core/domain/errors";

class ConcreteAppError extends AppError {
  code = "TEST";
  statusCode = 999;
}

describe("AppError", () => {
  it("sets name from constructor", () => {
    const err = new ConcreteAppError("testing");
    expect(err.name).toBe("ConcreteAppError");
    expect(err.message).toBe("testing");
  });
});

describe("NotFoundError", () => {
  it("formats message with id", () => {
    const err = new NotFoundError("User", "123");
    expect(err.message).toBe('User "123" no encontrado');
    expect(err.code).toBe("NOT_FOUND");
    expect(err.statusCode).toBe(404);
  });

  it("formats message without id", () => {
    const err = new NotFoundError("Post");
    expect(err.message).toBe("Post no encontrado");
  });
});

describe("ValidationError", () => {
  it("has correct code and status", () => {
    const err = new ValidationError("bad input");
    expect(err.code).toBe("VALIDATION_ERROR");
    expect(err.statusCode).toBe(400);
  });
});

describe("UnauthorizedError", () => {
  it("has default message", () => {
    const err = new UnauthorizedError();
    expect(err.message).toBe("No autorizado");
    expect(err.code).toBe("UNAUTHORIZED");
    expect(err.statusCode).toBe(401);
  });

  it("accepts custom message", () => {
    const err = new UnauthorizedError("Denied");
    expect(err.message).toBe("Denied");
  });
});

describe("InternalError", () => {
  it("has default message", () => {
    const err = new InternalError();
    expect(err.message).toBe("Error interno");
    expect(err.code).toBe("INTERNAL_ERROR");
    expect(err.statusCode).toBe(500);
  });
});
