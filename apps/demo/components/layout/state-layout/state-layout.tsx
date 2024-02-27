import { AppShell } from "@mantine/core";
import { ReactNode } from "react";
import { Header } from "../header";

export function StateLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
