"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
} from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({
  toast: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

const TOAST_MESSAGES: Record<string, [string, ToastType]> = {
  saved: ["Saved successfully", "success"],
  deleted: ["Deleted successfully", "success"],
  deployed: ["Deploy triggered", "info"],
  error: ["An error occurred", "error"],
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const prefix = useId();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const addToast = useCallback(
    (message: string, type: ToastType = "success") => {
      const id = `${prefix}-${Date.now()}`;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    },
    [prefix],
  );

  // Read ?toast= param on mount/navigation
  useEffect(() => {
    const toastKey = searchParams.get("toast");
    if (toastKey && TOAST_MESSAGES[toastKey]) {
      const [msg, type] = TOAST_MESSAGES[toastKey];
      addToast(msg, type);
      // Remove toast param from URL
      const params = new URLSearchParams(searchParams.toString());
      params.delete("toast");
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    }
  }, [searchParams, addToast, router, pathname]);

  const bgColor: Record<ToastType, string> = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
  };

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`${bgColor[t.type]} text-white px-4 py-2 rounded-lg shadow-lg text-sm animate-slide-in`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
