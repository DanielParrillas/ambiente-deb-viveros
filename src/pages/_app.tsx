import "@/src/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/src/components/layout/Layout";
import { setDayFormat } from "@/src/utils/dayFormat";
import { trpc } from "@/src/utils/trpc";
import Head from "next/head";

setDayFormat();

export const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Viveros</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default trpc.withTRPC(App);
