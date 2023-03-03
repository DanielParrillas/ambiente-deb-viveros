import useSWR, { Fetcher } from "swr";
import axios from "axios";
import { EspecieInterfaceSimple } from "@/pages/api/especies";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const fetcher: Fetcher<EspecieInterfaceSimple[], string> = (url: string) =>
  axios
    .get(url, {
      params: {
        tipo: "simple",
      },
    })
    .then((res) => res.data);

export default function EspecieAutoComplete() {
  const { data: especies, error: especiesError } = useSWR(
    "/api/especies",
    fetcher
  );
  if (especiesError)
    return (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={[{ label: "error", id: "errorEspecies" }]}
        renderInput={(params) => <TextField {...params} label="Especie..." />}
      />
    );
  if (!especies)
    return (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={[{ label: "cargando...", id: "cargandoEspecies" }]}
        renderInput={(params) => <TextField {...params} label="Especie..." />}
      />
    );
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={especies.map((item) => ({
        label: `${item.cientifico} - ${item.comun}`,
        id: `especieOption${item.id}`,
      }))}
      renderInput={(params) => <TextField {...params} label="Especie" />}
    />
  );
}
