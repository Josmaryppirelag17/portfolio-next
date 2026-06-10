import { useEffect, useRef, useCallback, useState } from "react";

type WorkerMessage = Record<string, unknown>;

export function useWorker<TResult = WorkerMessage>(
  workerFactory: () => Worker,
  options?: { autoTerminate?: boolean }
) {
  const workerRef = useRef<Worker | null>(null);
  const [result, setResult] = useState<TResult | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    let worker: Worker | null = null;
    try {
      worker = workerFactory();
      workerRef.current = worker;

      worker.onmessage = (e: MessageEvent<TResult>) => {
        setResult(e.data);
        setError(null);
      };

      worker.onerror = (err) => {
        setError(err instanceof Error ? err : new Error("Unknown worker error"));
      };
    } catch {
      setSupported(false);
    }

    return () => {
      if (worker && options?.autoTerminate !== false) {
        worker.terminate();
        workerRef.current = null;
      }
    };
  }, [workerFactory, options?.autoTerminate]);

  const postMessage = useCallback((msg: WorkerMessage) => {
    workerRef.current?.postMessage(msg);
  }, []);

  return { result, error, supported, postMessage };
}
