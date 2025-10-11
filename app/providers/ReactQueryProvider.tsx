import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    },
  },
});

type ProvidersProps = {
  children: React.ReactNode;
};

function ReactQueryProvider({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} /> {children}
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
