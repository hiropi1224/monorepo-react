"use client";

import { AppShell, Burger, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { ReactNode } from "react";

export function DefaultLayout({ children }: { children: ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Text ta="center">Reactまとめ</Text>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Link href="/use-state">About useState</Link>
        <Link href="/use-effect">About useEffect</Link>
        <Link href="/use-effect/bad">Bad</Link>
        <Link href="/use-effect/best">Best</Link>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
