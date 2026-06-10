export function capturePageView(): void {}

export function captureFormSubmit(_payload: { name: string; email: string }): void {}

export function captureFormError(_error: string, _status?: number): void {}

export function captureApiCall(_method: string, _path: string, _status: number, _durationMs: number): void {}
