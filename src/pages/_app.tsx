import "@/src/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/src/components/layout/Layout";
import { setDayFormat } from "@/src/utils/dayFormat";
import { trpc } from "@/src/utils/trpc";

setDayFormat();

export const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default trpc.withTRPC(App);
