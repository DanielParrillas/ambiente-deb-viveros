import TablaSolicitudDetalle from "../tables/TablaSolicitudDetalle";
import TablaAsignacionesDeSolicitud from "../tables/TablaAsignacionesDeSolicitud";
import TablaSolicitudesSheet from "../tables/TablaAsignacionesDeSolicitudSheet";

export default function DatosAsignacion() {
  return (
    <div className="grid gap-4">
      <TablaSolicitudesSheet />
    </div>
  );
}
