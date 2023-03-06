import EspecieAutoComplete from "./components/EspecieAutoComplete";
import axios from "axios";

import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";
import { EspecieInterfaceSimple } from "@/pages/api/especies";

interface Disponibilidad
  extends Prisma.ViveroDisponibilidadEspeciesUpdateInput {
  id: number;
}
interface DisponibilidadFormProps {
  disponibilidad?: Disponibilidad;
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
      <div className="basis-9/12 p-2">
        <EspecieAutoComplete />
      </div>
      <div className="basis-3/12 p-2">
        <TextField
          id="outlined-basic"
          label="Cantidad"
          variant="outlined"
          type={"number"}
          className="w-full"
        />
      </div>
      <div className="basis-1/2 p-2">
        <TextField
          id="outlined-basic"
          label="Fecha"
          variant="outlined"
          type={"date"}
          placeholder=""
          className="w-full"
        />
      </div>
      <div>
        <Button variant="contained" className="normal-case">
          Guardar
        </Button>
      </div>
    </form>
  );
}
