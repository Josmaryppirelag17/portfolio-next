export function getErrorMessage(err: unknown, fallback = "UNKNOWN_FATAL"): string {
  if (err instanceof Error) return err.message;
  return String(err) || fallback;
}
