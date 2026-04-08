import React from "react";
import { Dialog, DialogPanel } from "@headlessui/react";

const Drawer = ({ open, onClose, title, children }) => {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-slate-900/45" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full justify-end">
          <DialogPanel className="w-full max-w-md bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            <div className="mt-4">{children}</div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Drawer;
