import { useAlert } from "@/src/hooks/alertStore";
import { useSolicitudStore } from "@/src/hooks/solicitudStore";
import { trpc } from "@/src/utils/trpc";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
