import "@mantine/core/styles.css";
import "@mantine/code-highlight/styles.css";
import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { DefaultLayout } from "../components/default-layout";

export const metadata: Metadata = {
  title: "Create Turborepo",
  description: "Generated by create turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="ja">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <DefaultLayout>{children}</DefaultLayout>
        </MantineProvider>
      </body>
    </html>
  );
}
