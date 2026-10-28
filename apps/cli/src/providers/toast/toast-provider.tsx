import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { DEFAULT_DURATION, ToastContext } from "./constants";
import Toast from "./toast";
import type { ToastOptions, ToastProviderProps } from "./types";

function ToastProvider({ children }: ToastProviderProps) {
  const [currentToast, setCurrentToast] = useState<ToastOptions | null>(null);
  const timeoutHandleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCurrentTimeout = useCallback(() => {
    if (timeoutHandleRef.current !== null) {
      clearTimeout(timeoutHandleRef.current);
      timeoutHandleRef.current = null;
    }
  }, []);

  useEffect(() => clearCurrentTimeout, [clearCurrentTimeout]);

  const show = useCallback(
    (options: ToastOptions) => {
      const duration = options.duration ?? DEFAULT_DURATION;

      clearCurrentTimeout();

      setCurrentToast({
        ...options,
        variant: options.variant ?? "info",
        duration,
      });

      timeoutHandleRef.current = setTimeout(() => {
        setCurrentToast(null);
      }, duration);

      return clearCurrentTimeout;
    },
    [clearCurrentTimeout],
  );

  const value = useMemo(() => ({ show }), [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast currentToast={currentToast} />
    </ToastContext.Provider>
  );
}

export default ToastProvider;
