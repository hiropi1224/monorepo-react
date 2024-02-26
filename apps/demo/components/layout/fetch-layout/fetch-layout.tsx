import { AppShell, Flex } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Link from "next/link";
import { ReactNode } from "react";

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
          <Flex justify="center" align="center" gap="md">
            <Link href="/fetch/useeffect">useEffect</Link>
            <Link href="/fetch/reactquery">ReactQuery</Link>
          </Flex>
        </AppShell.Header>

        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
