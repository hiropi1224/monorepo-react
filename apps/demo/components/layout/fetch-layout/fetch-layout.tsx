import { AppShell } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ReactNode } from "react";
import { Header } from "../header";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export function FetchLayout({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppShell header={{ height: 60 }} padding="md">
        <AppShell.Header bg="grape.1">
          <Header />
        </AppShell.Header>

        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
