const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  if (!GA_ID) return;
  const w = window as unknown as Window;
  w.dataLayer?.push(args);
}

export function capturePageView(path?: string) {
  gtag("event", "page_view", {
    page_path: path ?? window.location.pathname,
    page_title: document.title,
    page_location: window.location.href,
  });
}

export function captureFormSubmit(payload: { name: string; email: string }) {
  gtag("event", "form_submit", {
    event_category: "contact",
    event_label: "contact_form",
    value: 1,
    name: payload.name,
    email: payload.email,
  });
}

export function captureFormError(error: string, status?: number) {
  gtag("event", "form_error", {
    event_category: "contact",
    event_label: "contact_form_error",
    error_message: error,
    status_code: status,
    non_interaction: true,
  });
}

export function captureApiCall(method: string, path: string, status: number, durationMs: number) {
  gtag("event", "api_call", {
    event_category: "api",
    event_label: `${method} ${path}`,
    method,
    path,
    status_code: status,
    duration_ms: durationMs,
  });
}
