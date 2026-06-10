import type { NextRequest } from "next/server";

export type LogLevel = "info" | "warn" | "error" | "debug";

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  requestId?: string;
  method?: string;
  path?: string;
  status?: number;
  durationMs?: number;
  error?: string;
  data?: Record<string, unknown>;
}

function generateRequestId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function formatLog(entry: LogEntry): string {
  const parts = [
    `[${entry.timestamp}]`,
    `[${entry.level.toUpperCase()}]`,
    entry.requestId ? `[${entry.requestId}]` : "",
    entry.message,
  ];

  const extras: string[] = [];
  if (entry.method) extras.push(`method=${entry.method}`);
  if (entry.path) extras.push(`path=${entry.path}`);
  if (entry.status) extras.push(`status=${entry.status}`);
  if (entry.durationMs !== undefined) extras.push(`duration=${entry.durationMs}ms`);
  if (entry.error) extras.push(`error=${entry.error}`);

  if (extras.length > 0) parts.push(`| ${extras.join(" ")}`);
  if (entry.data) parts.push(JSON.stringify(entry.data));

  return parts.filter(Boolean).join(" ");
}

export function createLogger(req?: NextRequest) {
  const requestId = generateRequestId();
  const start = performance.now();

  return {
    requestId,

    info(message: string, data?: Record<string, unknown>) {
      const entry: LogEntry = {
        timestamp: new Date().toISOString(),
        level: "info",
        message,
        requestId,
        method: req?.method,
        path: req?.url,
        data,
      };
      console.log(formatLog(entry));
    },

    warn(message: string, data?: Record<string, unknown>) {
      const entry: LogEntry = {
        timestamp: new Date().toISOString(),
        level: "warn",
        message,
        requestId,
        method: req?.method,
        path: req?.url,
        data,
      };
      console.warn(formatLog(entry));
    },

    error(message: string, error?: string, data?: Record<string, unknown>) {
      const entry: LogEntry = {
        timestamp: new Date().toISOString(),
        level: "error",
        message,
        requestId,
        method: req?.method,
        path: req?.url,
        error,
        data,
      };
      console.error(formatLog(entry));
    },

    response(status: number, data?: Record<string, unknown>) {
      const durationMs = Math.round(performance.now() - start);
      const entry: LogEntry = {
        timestamp: new Date().toISOString(),
        level: status >= 500 ? "error" : status >= 400 ? "warn" : "info",
        message: `${req?.method} ${req?.url} -> ${status}`,
        requestId,
        method: req?.method,
        path: req?.url,
        status,
        durationMs,
        data,
      };
      console.log(formatLog(entry));
      return requestId;
    },
  };
}

export type RequestLogger = ReturnType<typeof createLogger>;

export class LoggerService {
  static createLogger = createLogger;
}
