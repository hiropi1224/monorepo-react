import "../styles/globals.css";
import "react-app-polyfill/ie11";

import { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({
  Component,
  pageProps,
}: AppPropsWithLayout): JSX.Element {
  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page;
    });

  return <>{getLayout(<Component {...pageProps} />)}</>;
}
