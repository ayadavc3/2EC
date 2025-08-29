"use client";

import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface QueryProviderProps {
  children: React.ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  // Create a new QueryClient instance for each component tree
  // This ensures that data is not shared between different users/sessions
  const [queryClient] = useState(() => new QueryClient({}));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevTools only in development */}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
