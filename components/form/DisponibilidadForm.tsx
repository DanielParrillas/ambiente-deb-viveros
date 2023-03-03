import EspecieAutoComplete from "./components/EspecieAutoComplete";

import { TextField } from "@mui/material";

export default function DisponibilidadForm() {
  return (
    <div className="flex flex-col gap-4">
      <EspecieAutoComplete />
      <TextField
        id="outlined-basic"
        label="Cantidad"
        variant="outlined"
        type={"number"}
      />
      <TextField
        id="outlined-basic"
        label="Fecha"
        variant="outlined"
        type={"date"}
        placeholder=""
      />
    </div>
  );
}
