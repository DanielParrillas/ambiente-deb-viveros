import { useAlert } from "@/src/hooks/alertStore";
import { useSolicitudStore } from "@/src/hooks/solicitudStore";
import { trpc } from "@/src/utils/trpc";
import { useEffect } from "react";

export default function SolicitudDetalle() {
  const { solicitud, setSolicitud } = useSolicitudStore();
  const { lanzarAlerta } = useAlert();
  const solicitudQuery = trpc.solicitud.porId.useQuery(
    solicitud.id === "" ? 0 : solicitud.id
  );

  useEffect(() => {
    lanzarAlerta("Cargando solicitud...", { severity: "info" });
  }, [solicitudQuery.isLoading]);

  useEffect(() => {
    const solicitudFromQuery = solicitudQuery.data?.solicitud;
    if (solicitudFromQuery) {
      lanzarAlerta("Solicitud cargada", { severity: "success" });
      setSolicitud({ ...solicitud, ...solicitudFromQuery });
    }
  }, [solicitudQuery.data]);

  useEffect(() => {
    if (solicitudQuery.isError || solicitudQuery.isRefetchError)
      lanzarAlerta(solicitudQuery.error.message, { severity: "error" });
  }, [solicitudQuery.isError]);

  return (
    <div className="w-full bg-slate-400">
      <p className="max-w-full overflow-x-scroll">
        {JSON.stringify(solicitud)}
      </p>
    </div>
  );
}
