import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useWorker } from "@/hooks/useWorker";

describe("useWorker", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns supported true when worker creates successfully", () => {
    const mockWorker = { onmessage: null, onerror: null, postMessage: vi.fn(), terminate: vi.fn() };
    const factory = () => mockWorker as unknown as Worker;
    const { result } = renderHook(() => useWorker(factory));
    expect(result.current.supported).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it("sets supported false when worker factory throws", () => {
    const factory = () => { throw new Error("Worker not available"); };
    const { result } = renderHook(() => useWorker(factory));
    expect(result.current.supported).toBe(false);
  });

  it("sends messages via postMessage", () => {
    const mockWorker = { onmessage: null, onerror: null, postMessage: vi.fn(), terminate: vi.fn() };
    const factory = () => mockWorker as unknown as Worker;
    const { result } = renderHook(() => useWorker(factory));
    act(() => result.current.postMessage({ test: true }));
    expect(mockWorker.postMessage).toHaveBeenCalledWith({ test: true });
  });

  it("updates result on worker message", () => {
    const mockWorker = { onmessage: null, onerror: null, postMessage: vi.fn(), terminate: vi.fn() };
    const factory = () => mockWorker as unknown as Worker;
    const { result } = renderHook(() => useWorker(factory));
    act(() => { (mockWorker.onmessage as any)({ data: { done: true } }); });
    expect(result.current.result).toEqual({ done: true });
  });

  it("terminates worker on unmount", () => {
    const terminate = vi.fn();
    const mockWorker = { onmessage: null, onerror: null, postMessage: vi.fn(), terminate };
    const factory = () => mockWorker as unknown as Worker;
    const { unmount } = renderHook(() => useWorker(factory));
    unmount();
    expect(terminate).toHaveBeenCalledOnce();
  });
});
