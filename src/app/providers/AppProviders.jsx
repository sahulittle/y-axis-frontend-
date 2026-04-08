import React from "react";
import { BrowserRouter } from "react-router-dom";
import QueryProvider from "./QueryProvider";
import ToastProvider from "./ToastProvider";
import ErrorBoundary from "../../shared/feedback/ErrorBoundary";

const AppProviders = ({ children }) => {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <ToastProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </ToastProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
};

export default AppProviders;
