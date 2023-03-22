import { useEffect, useState } from "react";
import { trpc } from "@/src/utils/trpc";
import { useAlert } from "@/src/hooks/alertStore";
import TablaSolicitudes from "@/src/components/tables/TablaSolicitudes";
import type { Data as SolicitudData } from "@/src/components/tables/TablaSolicitudes";

export default function Solicitudes() {
  const { lanzarAlerta } = useAlert();
  const solicitudQuery = trpc.solicitud.lista.useQuery();
  const [solicitudes, setSolicitudes] = useState<SolicitudData[]>([]);

  useEffect(() => {
    if (solicitudQuery.isError)
      lanzarAlerta(solicitudQuery.error.message, { severity: "error" });
  }, [solicitudQuery.isError]);

  useEffect(() => {
    if (solicitudQuery.data?.lista) {
      console.log(solicitudQuery.data.lista);
      setSolicitudes(generarFilas());
    }
  }, [solicitudQuery.data]);

  const generarFilas = (): SolicitudData[] => {
    if (solicitudQuery.data?.lista) {
      return solicitudQuery.data.lista.map<SolicitudData>((solicitud) => ({
        estado: solicitud.estado.nombre,
        fecha: solicitud.fechaDeSolicitud,
        id: solicitud.id,
        institucion: solicitud.institucionSolicitante,
        nombreCompleto:
          solicitud.nombreDelSolicitante + solicitud.apellidoDelSolicitante,
        notas: solicitud.notas ? solicitud.notas : "Sin notas",
      }));
    } else {
      return [];
    }
  };

  return <TablaSolicitudes rows={solicitudes} />;
}
