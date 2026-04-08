import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastContext = createContext(null);

let autoIncrement = 1;

const ToastProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const dismiss = useCallback((id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const push = useCallback((message, type = "info") => {
    const id = autoIncrement;
    autoIncrement += 1;
    setItems((current) => [...current, { id, message, type }]);
    window.setTimeout(() => dismiss(id), 3000);
  }, [dismiss]);

  const value = useMemo(() => ({
    success: (message) => push(message, "success"),
    error: (message) => push(message, "error"),
    info: (message) => push(message, "info"),
  }), [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-[100] space-y-2 w-80 max-w-[90vw]">
        {items.map((item) => (
          <div
            key={item.id}
            className={`rounded-xl border px-4 py-3 shadow-md text-sm ${
              item.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                : item.type === "error"
                ? "bg-rose-50 border-rose-200 text-rose-900"
                : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
          >
            {item.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

export default ToastProvider;
