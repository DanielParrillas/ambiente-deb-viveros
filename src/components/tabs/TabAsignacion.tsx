import TablaSolicitudDetalle from "../tables/TablaSolicitudDetalle";
import TablaAsignacionesDeSolicitud from "../tables/TablaAsignacionesDeSolicitud";

export default function DatosAsignacion() {
  return (
    <div className="grid gap-4">
      <TablaAsignacionesDeSolicitud />
    </div>
  );
}
