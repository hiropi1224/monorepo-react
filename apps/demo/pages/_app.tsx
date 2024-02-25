import "@mantine/core/styles.css";
import "@mantine/code-highlight/styles.css";

import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { createTheme, MantineProvider } from "@mantine/core";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page;
    });

  return (
    <MantineProvider theme={theme}>
      {getLayout(<Component {...pageProps} />)}
    </MantineProvider>
  );
}
