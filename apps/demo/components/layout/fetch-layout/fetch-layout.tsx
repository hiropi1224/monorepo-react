import { AppShell, Flex } from "@mantine/core";
import Link from "next/link";
import { ReactNode } from "react";

export function FetchLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header bg="grape.1">
        <Flex justify="center" align="center">
          <Link href="/fetch/useeffect">useEffect</Link>
          <Link href="/nav">Nav</Link>
        </Flex>
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
