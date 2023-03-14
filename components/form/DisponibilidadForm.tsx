import EspecieAutoComplete from "./components/EspecieAutoComplete";
import { TextField, Button } from "@mui/material";
import { Prisma } from "@prisma/client";
import { useDisponibilidadStore } from "@/hooks/disponibilidadStore";
import { useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { disponibilidadPOST } from "@/types";
import { useAlert } from "@/hooks/alertStore";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

import { DispiniblidadesDeUnViveroInterface } from "@/prisma/queries/disponibilidadesQueries";

interface Disponibilidad
  extends Prisma.ViveroDisponibilidadEspeciesUpdateInput {
  id: number;
}

export default function DisponibilidadForm() {
  const disponibilidad = useDisponibilidadStore(
    (state) => state.disponibilidad
  );
  const { lanzarAlerta } = useAlert();

  const {
    limpiarDatos: limpiarDatosDisponibilidad,
    setDisponibilidad,
    setDisponibilidadDeunVivero,
    disponibilidadesDeUnVivero,
  } = useDisponibilidadStore();

  useEffect(() => {
    limpiarDatosDisponibilidad("vivero");
  }, []);

  //console.log(disponibilidad);
  const handleSubmit = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    //console.log(disponibilidad);
    if (
      disponibilidad.disponibles !== "" &&
      disponibilidad.enProceso !== "" &&
      disponibilidad.especie !== "" &&
      disponibilidad.vivero !== "" &&
      disponibilidad.fecha !== ""
    ) {
      const data: disponibilidadPOST = {
        disponibles: disponibilidad.disponibles,
        enProceso: disponibilidad.enProceso,
        fecha: dayjs(disponibilidad.fecha).utc(false).format(),
        especieId: disponibilidad.especie.id,
        viveroId: disponibilidad.vivero.id,
      };
      console.log(data);
      await axios
        .post("/api/disponibilidades", data)
        .then((response) => {
          const temp: DispiniblidadesDeUnViveroInterface = response.data;
          console.log(temp);
          setDisponibilidad({ ...temp, vivero: disponibilidad.vivero });
          lanzarAlerta("Nueva disponibilidad creada", { severity: "success" });
        })
        .catch((error) => {
          console.error(error);
          lanzarAlerta("No se pudo guardar el dato", { severity: "error" });
        });
    } else {
      console.error("error en el formulario de disponibilidad");
    }
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
      {/* <div className="basis-1/3 lg:basis-1/6 p-2">
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
      </div> */}
      <div className="basis-1/3 lg:basis-1/6 p-2">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDateTimePicker
            label="Fecha"
            value={dayjs(disponibilidad.fecha)}
            onChange={(value) => {
              setDisponibilidad({
                ...disponibilidad,
                fecha: value === null ? "" : dayjs(value),
              });
            }}
          />
        </LocalizationProvider>
      </div>
      <div className="flex mt-5 items-center md:basis-full justify-around md:justify-end md:pr-2 md:gap-8">
        <Button
          type="submit"
          variant="contained"
          color="success"
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
