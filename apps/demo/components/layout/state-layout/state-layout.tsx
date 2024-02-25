import { AppShell, Flex } from "@mantine/core";
import Link from "next/link";
import { ReactNode } from "react";

export function StateLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Flex gap="xl" justify="center">
          <Link href="/state/context">context</Link>
          <Link href="/state/zustand">zustand</Link>
        </Flex>
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
