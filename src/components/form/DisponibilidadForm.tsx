import EspecieAutoComplete from "./components/EspecieAutoComplete";
import { TextField, Button } from "@mui/material";
import { useDisponibilidadStore } from "@/src/hooks/disponibilidadStore";
import dayjs from "dayjs";
import { useAlert } from "@/src/hooks/alertStore";
import { useRouter } from "next/router";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { AxiosError } from "axios";

export default function DisponibilidadForm() {
  const {
    guardarDisponibilidad,
    borrarDisponibilidad,
    getDisponibilidadesDeunVivero,
    limpiarDisponibilidad,
    setDisponibilidad,
    setDisponibilidadForm,
    disponibilidad,
    disponibilidadForm,
  } = useDisponibilidadStore();

  const { lanzarAlerta } = useAlert();
  const router = useRouter();

  const handleSubmit = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    lanzarAlerta("Guardando disponibilidad", { severity: "info" });
    setDisponibilidadForm({ ...disponibilidadForm, deshabilitado: true });
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
      } else {
        lanzarAlerta("Disponibilidad guardada", { severity: "success" });
        limpiarDisponibilidad("vivero");
        setDisponibilidadForm({ ...disponibilidadForm, deshabilitado: false });
        if (router.query.id !== undefined) {
          getDisponibilidadesDeunVivero(router.query.id);
        }
      }
    });
  };

  const handleDelete = async () => {
    lanzarAlerta("Eliminando disponibilidad", { severity: "info" });
    setDisponibilidadForm({ ...disponibilidadForm, deshabilitado: true });
    await borrarDisponibilidad().then((response) => {
      lanzarAlerta("Disponibilidad eliminada", { severity: "success" });
      limpiarDisponibilidad("vivero");
      setDisponibilidadForm({ ...disponibilidadForm, deshabilitado: false });
      if (router.query.id !== undefined) {
        getDisponibilidadesDeunVivero(router.query.id);
      }
    });
  };

  return (
    <form
      className="flex flex-col md:flex-row md:flex-wrap "
      onSubmit={handleSubmit}
    >
      <div className="basis-full xl:basis-3/6 p-2">
        <EspecieAutoComplete
          required
          disabled={disponibilidadForm.deshabilitado}
        />
      </div>
      <div className="basis-1/3 xl:basis-1/6 p-2">
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
          disabled={disponibilidadForm.deshabilitado}
          className="w-full"
        />
      </div>
      <div className="basis-1/3 xl:basis-1/6 p-2">
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
          disabled={disponibilidadForm.deshabilitado}
          className="w-full"
        />
      </div>
      <div className="basis-1/3 xl:basis-1/6 p-2">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDateTimePicker
            className="w-full"
            label="Fecha"
            value={dayjs(disponibilidad.fecha)}
            onChange={(value) => {
              //console.log(dayjs(value).format("YYYY-MM-DDTHH:mm:ssZ"));
              setDisponibilidad({
                ...disponibilidad,
                fecha: value === null ? "" : dayjs(value),
              });
            }}
            disabled={disponibilidadForm.deshabilitado}
          />
        </LocalizationProvider>
      </div>
      <div className="flex mt-5 items-center md:basis-full justify-around md:justify-end md:pr-2 md:gap-8">
        <Button
          type="submit"
          variant="contained"
          color="success"
          disabled={disponibilidadForm.deshabilitado}
          className="normal-case"
        >
          {disponibilidad.id === "" ? "Guardar" : "Guardar cambios"}
        </Button>
        {disponibilidad.id !== "" ? (
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={disponibilidadForm.deshabilitado}
            className="normal-case"
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
