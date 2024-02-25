import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { ReactNode } from "react";

export function NavLayout({ children }: { children: ReactNode }) {
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
        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        Navbar
        <Link href="/">Home</Link>
        <Link href="/nav">Nav</Link>
      </AppShell.Navbar>

      <AppShell.Main bg="lime.1">{children}</AppShell.Main>
    </AppShell>
  );
}
