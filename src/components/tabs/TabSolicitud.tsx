import { useSolicitudStore } from "@/src/hooks/solicitudStore";
import { Chip } from "@mui/material";
import TablaSolicituDetalle from "../tables/TablaSolicitudDetalle";

export function DatosSolicitud() {
  const { solicitud } = useSolicitudStore();

  return (
    <>
      <h2 className="text-center col-span-2 mb-4">Solicitud {solicitud.id}</h2>
      <div className="flex flex-col ">
        <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col mb-4 gap-2">
            <h4>Nombre</h4>
            <div>
              <Chip
                label={
                  solicitud.nombreDelSolicitante +
                  " " +
                  solicitud.apellidoDelSolicitante
                }
                className="select-all"
              />
            </div>
          </div>
          <div className="flex flex-col mb-4 gap-2">
            <h4>Institución</h4>
            <div>
              <Chip
                label={
                  solicitud.institucionSolicitante
                    ? solicitud.institucionSolicitante
                    : "Persona natural"
                }
                color={solicitud.institucionSolicitante ? "default" : "success"}
              />
            </div>
          </div>
          <div className="flex flex-col mb-4 gap-2">
            <h4>Lugar a reforestar</h4>
            <div>
              <p className="select-all">{`${
                solicitud.municipio === ""
                  ? "..."
                  : `${solicitud.municipio.departamento.nombre}, ${solicitud.municipio.nombre}, ${solicitud.lugarAReforestar}`
              }`}</p>
            </div>
          </div>
          <div className="flex flex-col mb-4 gap-2">
            <h4>Correo</h4>
            <div>
              <Chip
                label={`${solicitud.correoDelSolicitante}`}
                className="select-all"
              />
            </div>
          </div>
          {solicitud.telefonoDelSolicitante !== null &&
            solicitud.telefonoDelSolicitante !== "" && (
              <div className="flex flex-col mb-4 gap-2">
                <h4>Teléfono</h4>
                <div>
                  <Chip
                    label={solicitud.telefonoDelSolicitante}
                    className="select-all"
                  />
                </div>
              </div>
            )}
          <div className="flex flex-col mb-4 gap-2">
            <h4>Celular</h4>
            <div>
              <Chip
                label={solicitud.celularDelSolicitante}
                className="select-all"
              />
            </div>
          </div>
          {solicitud.notas !== null && solicitud.notas !== "" && (
            <div className="flex flex-col mb-4 gap-2 md:col-span-2 lg:col-span-3">
              <h4>Notas</h4>
              <div>
                <p className="select-all">{solicitud.notas}</p>
              </div>
            </div>
          )}
        </div>
        <h4 className="mb-2">Detalle por especie</h4>
        <TablaSolicituDetalle />
      </div>
    </>
  );
}
