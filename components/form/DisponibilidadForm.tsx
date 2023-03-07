import EspecieAutoComplete from "./components/EspecieAutoComplete";
import axios from "axios";

import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";
import { EspecieInterfaceSimple } from "@/pages/api/especies";

import { esES, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface Disponibilidad
  extends Prisma.ViveroDisponibilidadEspeciesUpdateInput {
  id: number;
}
interface DisponibilidadFormProps {
  disponibilidad?: Disponibilidad;
  modo: "nuevo" | "edicion";
}

export default function DisponibilidadForm(props: DisponibilidadFormProps) {
  const [disponibilidad, setDisponibilidad] = useState<Disponibilidad>();

  useEffect(() => {
    if (props.disponibilidad) {
      setDisponibilidad(props.disponibilidad);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="flex flex-col md:flex-row md:flex-wrap">
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
          className="w-full"
        />
      </div>
      <div className="basis-1/3 lg:basis-1/6 p-2">
        <TextField
          id="disponibles"
          label="Disponibles"
          variant="outlined"
          type={"number"}
          required
          className="w-full"
        />
      </div>
      <div className="basis-1/3 lg:basis-1/6 p-2">
        <TextField
          id="fecha-disponibilidad"
          label="Fecha"
          type="date"
          defaultValue=""
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
          required
          className="w-full"
        />
      </div>
      <div className="flex mt-5 items-center md:basis-full justify-around md:justify-end md:pr-2 md:gap-8">
        <Button
          variant="contained"
          className="transition ease-out duration-200 normal-case bg-blue-700 hover:bg-blue-600 "
        >
          Guardar
        </Button>
        {props.modo === "edicion" ? (
          <Button
            variant="contained"
            className="transition ease-out duration-200 normal-case bg-red-700 hover:bg-red-600 "
          >
            Eliminar
          </Button>
        ) : (
          <></>
        )}
      </div>
    </form>
  );
}
