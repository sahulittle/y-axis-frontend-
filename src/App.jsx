import React, { Suspense } from "react";
import AppRoutes from "./app/routes";

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-sm text-slate-600">
          Loading page...
        </div>
      }
    >
      <AppRoutes />
    </Suspense>
  );
};

export default App;