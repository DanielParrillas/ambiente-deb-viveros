import { useEffect, useState } from "react";
import { trpc } from "@/src/utils/trpc";
import { useAlert } from "@/src/hooks/alertStore";
import SortingTable from '@/src/components/table/SortingTable';
import type { Encabezado } from '@/src/components/table/Encabezado';

const headers: 

export default function Solicitudes() {
  const { lanzarAlerta } = useAlert();
  const solicitudQuery = trpc.solicitud.lista.useQuery();

  useEffect(() => {
    if (solicitudQuery.isError)
      lanzarAlerta(solicitudQuery.error.message, { severity: "error" });
  }, [solicitudQuery.isError]);

  const formatSolicitudes =()=> {
    let data = []

    if(solicitudQuery.data?.lista){
      return data
    }
  }

  return <SortingTable />;
}
