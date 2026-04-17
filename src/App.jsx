import React, { Suspense, useState } from "react";
import AppRoutes from "./app/routes";
import Loader from "./modules/public/pages/Loading";

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <Loader onFinish={() => setLoading(false)} />
      ) : (
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-sm text-slate-600">
              Loading page...
            </div>
          }
        >
          <AppRoutes />
        </Suspense>
      )}
    </>
  );
};

export default App;