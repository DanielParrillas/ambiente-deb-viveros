import EspecieAutoComplete from "./components/EspecieAutoComplete";
import { TextField, Button } from "@mui/material";
import { Prisma } from "@prisma/client";
import { useDisponibilidadStore } from "@/hooks/disponibilidadStore";
import { useEffect } from "react";
import dayjs from "dayjs";

interface Disponibilidad
  extends Prisma.ViveroDisponibilidadEspeciesUpdateInput {
  id: number;
}

export default function DisponibilidadForm() {
  const disponibilidad = useDisponibilidadStore(
    (state) => state.disponibilidad
  );
  const setDisponibilidad = useDisponibilidadStore(
    (state) => state.setDisponibilidad
  );
  const limpiarDatosDisponibilidad = useDisponibilidadStore(
    (state) => state.limpiarDatos
  );

  useEffect(() => {
    limpiarDatosDisponibilidad("vivero");
  }, []);

  //console.log(disponibilidad);
  const handleSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(disponibilidad);
  };

  return (
    <form
      className="flex flex-col md:flex-row md:flex-wrap"
      onSubmit={handleSubmit}
    >
      <div className="basis-full lg:basis-3/6 p-2">
        <EspecieAutoComplete required />
      </div>
      <div className="basis-1/3 lg:basis-1/6 p-2">
        <TextField
          id="en-proceso"
          label="En proceso"
          variant="outlined"
          type={"number"}
          required
          value={disponibilidad.enProceso}
          onChange={(e) => {
            setDisponibilidad({
              ...disponibilidad,
              enProceso: e.target.value !== "" ? parseInt(e.target.value) : "",
            });
          }}
          className="w-full"
        />
      </div>
      <div className="basis-1/3 lg:basis-1/6 p-2">
        <TextField
          id="disponibles-input"
          label="Disponibles"
          variant="outlined"
          type={"number"}
          required
          value={disponibilidad.disponibles}
          onChange={(e) => {
            setDisponibilidad({
              ...disponibilidad,
              disponibles:
                e.target.value !== "" ? parseInt(e.target.value) : "",
            });
          }}
          className="w-full"
        />
      </div>
      <div className="basis-1/3 lg:basis-1/6 p-2">
        <TextField
          id="fecha-disponibilidad"
          label="Fecha"
          type="date"
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
          value={disponibilidad.fecha.toString().slice(0, 10)}
          onChange={(e) => {
            setDisponibilidad({
              ...disponibilidad,
              fecha: e.target.value !== "" ? e.target.value : "",
            });
            console.log(new Date(e.target.value));
          }}
          required
          className="w-full"
        />
      </div>
      <div className="flex mt-5 items-center md:basis-full justify-around md:justify-end md:pr-2 md:gap-8">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="normal-case"
        >
          {disponibilidad.id === "" ? "Guardar" : "Actualizar"}
        </Button>
        {disponibilidad.id !== "" ? (
          <Button variant="contained" color="error" className="normal-case">
            Eliminar
          </Button>
        ) : (
          <></>
        )}
      </div>
    </form>
  );
}
