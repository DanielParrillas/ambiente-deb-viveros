import { useAlert } from "@/src/hooks/alertStore";
import { useSolicitudStore } from "@/src/hooks/solicitudStore";
import { trpc } from "@/src/utils/trpc";
import { useRouter } from "next/router";
import { useEffect } from "react";
import TabsSolicitud from "@/src/components/tabs/TabsSolicitud";
import { Chip } from "@mui/material";

export default function SolicitudDetalle() {
  const { solicitud, setSolicitud, limpiarSolicitud } = useSolicitudStore();
  const router = useRouter();
  const { lanzarAlerta } = useAlert();
  const solicitudQuery = trpc.solicitud.porId.useQuery(
    parseInt(router.query.id ? router.query.id[0] : "0")
  );

  useEffect(() => {
    limpiarSolicitud();
  }, []);

  useEffect(() => {
    lanzarAlerta("Cargando solicitud...", { severity: "info" });
  }, [solicitudQuery.isLoading]);

  useEffect(() => {
    const solicitudFromQuery = solicitudQuery.data?.solicitud;
    if (solicitudFromQuery) {
      lanzarAlerta("Solicitud cargada", { severity: "success" });
      setSolicitud({ ...solicitud, ...solicitudFromQuery });
      console.log(solicitudFromQuery);
    }
  }, [solicitudQuery.data]);

  useEffect(() => {
    if (solicitudQuery.isError || solicitudQuery.isRefetchError)
      lanzarAlerta(solicitudQuery.error.message, { severity: "error" });
  }, [solicitudQuery.isError]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center grid-cols-2 mb-4 gap-2">
        <h3>{`${solicitud.nombreDelSolicitante} ${solicitud.apellidoDelSolicitante}`}</h3>
        <Chip
          size="small"
          label={solicitud.estado != "" ? solicitud.estado.nombre : "..."}
          className="text-xs"
          color={solicitud.institucionSolicitante ? "default" : "primary"}
        />
      </div>
      <TabsSolicitud />
    </div>
  );
}
