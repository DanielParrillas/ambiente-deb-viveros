import EspecieAutoComplete from "./components/EspecieAutoComplete";
import { TextField, Button } from "@mui/material";
import { Prisma } from "@prisma/client";
import {
  useDisponibilidadStore,
  initialState as initialStateDisponibilidad,
} from "@/hooks/disponibilidadStore";
import { useState } from "react";
import dayjs from "dayjs";

interface Disponibilidad
  extends Prisma.ViveroDisponibilidadEspeciesUpdateInput {
  id: number;
}
interface DisponibilidadFormProps {
  disponibilidad?: Disponibilidad;
  modo: "nuevo" | "edicion";
}

export default function DisponibilidadForm(props: DisponibilidadFormProps) {
  const disponibilidad = useDisponibilidadStore(
    (state) => state.disponibilidad
  );
  const setDisponibilidad = useDisponibilidadStore(
    (state) => state.setDisponibilidad
  );
  console.log(disponibilidad);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  console.log("fechas");
  console.log(disponibilidad.fecha);
  console.log(typeof disponibilidad.fecha);
  console.log(dayjs().format(String(new Date(disponibilidad.fecha))));

  return (
    <form className="flex flex-col md:flex-row md:flex-wrap">
      <div className="basis-full lg:basis-3/6 p-2">
        <EspecieAutoComplete
          required
          readOnly={props.modo === "nuevo" ? false : true}
        />
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
          value={String(disponibilidad.fecha)}
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
        <Button variant="contained" color="success">
          Guardar
        </Button>
        {props.modo === "edicion" ? (
          <Button variant="contained" color="error">
            Eliminar
          </Button>
        ) : (
          <></>
        )}
      </div>
    </form>
  );
}
