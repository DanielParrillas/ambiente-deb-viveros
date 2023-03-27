import "@/src/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/src/components/layout/Layout";
import { setDayFormat } from "@/src/utils/dayFormat";
import { trpc } from "@/src/utils/trpc";
import Head from "next/head";
import { useRouter } from "next/router";
import { useToolStore } from "../hooks/toolStore";

setDayFormat();

export const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

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
