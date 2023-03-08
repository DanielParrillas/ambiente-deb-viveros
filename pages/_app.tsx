import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/Layout";
import { setDayFormat } from "@/lib/dayFormat";

setDayFormat();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
