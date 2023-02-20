import { Inter } from "@next/font/google";
import { Alert } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

import FormularioSolicitud from "@/components/FormularioSolicitud";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <div>
      <Alert severity="success" color="info">
        This is a success alert — check it out!
      </Alert>
    </div>
  );
}
