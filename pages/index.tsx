import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

import FormularioSolicitud from "@/components/FormularioSolicitud";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <FormularioSolicitud></FormularioSolicitud>
    </Layout>
  );
}
