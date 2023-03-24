import { useAlert } from "@/src/hooks/alertStore";
import { useSolicitudStore } from "@/src/hooks/solicitudStore";
import { trpc } from "@/src/utils/trpc";
import { useEffect } from "react";

export default function SolicitudDetalle() {
  const { solicitud, setSolicitud } = useSolicitudStore();
  const {} = useAlert();
  const solicitudQuery = trpc.solicitud.porId.useQuery(
    solicitud.id === "" ? 0 : solicitud.id
  );

  useEffect(() => {
    const solicitudFromQuery = solicitudQuery.data?.solicitud;
    if (solicitudFromQuery) {
      setSolicitud({ ...solicitud, ...solicitudFromQuery });
    }
  }, [solicitudQuery.data]);

  return (
    <div className="w-full bg-slate-400">
      <p className="max-w-full overflow-x-scroll">
        {JSON.stringify(solicitud)}
      </p>
    </div>
  );
}
