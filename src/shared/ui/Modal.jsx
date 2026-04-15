import React from "react";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  widthClass = "max-w-3xl",
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6">
      <button
        type="button"
        aria-label="Close modal backdrop"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/45"
      />

      <div
        className={`relative w-full ${widthClass} max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl md:p-5`}
      >
        <div className="mb-3 flex items-start justify-between gap-4 border-b border-slate-100 pb-3">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
