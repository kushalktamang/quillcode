import type { ReactNode } from "react";

type ToastVariant = "success" | "error" | "info";

interface ToastProviderProps {
  children: ReactNode;
}

interface ToastOptions {
  message: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  show: (options: ToastOptions) => void;
}

export type { ToastProviderProps, ToastVariant, ToastOptions, ToastContextValue };
