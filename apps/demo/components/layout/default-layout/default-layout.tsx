import { AppShell } from "@mantine/core";
import { ReactNode } from "react";

export function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Main bg="blue.1">{children}</AppShell.Main>
      <AppShell.Footer>Footer</AppShell.Footer>
    </AppShell>
  );
}
