import { useEffect, useState } from "react";
import { trpc } from "@/src/utils/trpc";
import { useAlert } from "@/src/hooks/alertStore";
import TablaSolicitudes from "@/src/components/tables/TablaSolicitudes";
import type { Data as SolicitudData } from "@/src/components/tables/TablaSolicitudes";
import { TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import GetAppIcon from "@mui/icons-material/GetApp";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { useSolicitudStore } from "@/src/hooks/solicitudStore";

export default function Solicitudes() {
  const solicitudQuery = trpc.solicitud.lista.useQuery();
  const [solicitudes, setSolicitudes] = useState<SolicitudData[]>([]);
  const { lanzarAlerta } = useAlert();
  const router = useRouter();

  useEffect(() => {
    lanzarAlerta("Cargando solicitudes...", { severity: "info" });
  }, [solicitudQuery.isLoading]);

  useEffect(() => {
    if (solicitudQuery.isError || solicitudQuery.isRefetchError)
      lanzarAlerta(solicitudQuery.error.message, { severity: "error" });
  }, [solicitudQuery.isError, solicitudQuery.isRefetchError]);

  useEffect(() => {
    if (solicitudQuery.data?.lista) {
      lanzarAlerta("Solicitudes cargadas", { severity: "success" });
      setSolicitudes(generarFilas());
    }
  }, [solicitudQuery.data]);

  const generarFilas = (): SolicitudData[] => {
    if (solicitudQuery.data?.lista) {
      return solicitudQuery.data.lista.map<SolicitudData>((solicitud) => ({
        estado: solicitud.estado.nombre,
        fecha: solicitud.fechaDeSolicitud,
        id: solicitud.id,
        institucion:
          solicitud.institucionSolicitante === null
            ? "Persona natural"
            : solicitud.institucionSolicitante,
        nombreCompleto:
          solicitud.nombreDelSolicitante + solicitud.apellidoDelSolicitante,
        notas: solicitud.notas ? solicitud.notas : "Sin notas",
        cantidadSolicitadaTotal: solicitud.cantidad ? solicitud.cantidad : 0,
      }));
    } else {
      return [];
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="w-full mb-4 flex gap-2 md:gap-4 justify-between">
        <div className="flex items-end basis-full md:basis-1/2">
          <SearchIcon />
          <TextField
            label="Buscar"
            size="small"
            variant="standard"
            color="primary"
            className="w-full"
          />
        </div>
        <div className="flex gap-2 md:gap-4">
          <Button
            color="success"
            variant="outlined"
            startIcon={<GetAppIcon />}
            className="p-1 md:p-2 normal-case text-xs md:text-sm"
          >
            Exportar
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            onClick={() => {
              router.push("/solicitudes/nuevo");
            }}
            className="p-1 flex justify-center md:p-2 normal-case text-xs md:text-sm"
          >
            Agregar
          </Button>
        </div>
      </div>
      <TablaSolicitudes rows={solicitudes} />
    </div>
  );
}
