import EspecieAutoComplete from "./components/EspecieAutoComplete";
import { TextField, Button } from "@mui/material";
import { useDisponibilidadStore } from "@/hooks/disponibilidadStore";
import dayjs from "dayjs";
import { DisponibilidadPOST } from "@/types";
import { useAlert } from "@/hooks/alertStore";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { AxiosError } from "axios";

export default function DisponibilidadForm() {
  const disponibilidad = useDisponibilidadStore(
    (state) => state.disponibilidad
  );
  const { guardarDisponibilidad } = useDisponibilidadStore();

  const { lanzarAlerta } = useAlert();

  const { setDisponibilidad } = useDisponibilidadStore();

  const handleSubmit = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    guardarDisponibilidad().then((estado) => {
      if (estado.ok === false) {
        if (estado.error instanceof AxiosError) {
          if (estado.error.response?.data.message) {
            lanzarAlerta(estado.error.response.data.message, {
              severity: "error",
            });
          } else {
            lanzarAlerta(estado.error.message, { severity: "error" });
          }
        } else {
          lanzarAlerta("revisar consola, error desconocido", {
            severity: "error",
          });
          console.log(estado.error);
        }
      }
    });
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDateTimePicker
            className="w-full"
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
