import "@/src/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/src/components/layout/Layout";
import { setDayFormat } from "@/src/utils/dayFormat";

setDayFormat();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
