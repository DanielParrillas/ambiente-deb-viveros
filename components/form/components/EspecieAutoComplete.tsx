import useSWR, { Fetcher } from "swr";
import axios from "axios";
import { EspecieInterfaceSimple } from "@/pages/api/especies";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface EspecieAutoCompleteProps {
  className?: string;
  required?: boolean;
}

const fetcher: Fetcher<EspecieInterfaceSimple[], string> = (url: string) =>
  axios
    .get(url, {
      params: {
        tipo: "simple",
      },
    })
    .then((res) => res.data);

export default function EspecieAutoComplete(props: EspecieAutoCompleteProps) {
  const { data: especies, error: especiesError } = useSWR(
    "/api/especies",
    fetcher
  );
  if (especiesError)
    return (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={[]}
        renderInput={(params) => (
          <TextField {...params} label="Especie..." error />
        )}
        {...props}
      />
    );
  if (!especies)
    return (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={[{ label: "cargando...", id: "cargandoEspecies" }]}
        renderInput={(params) => <TextField {...params} label="Especie..." />}
        {...props}
      />
    );
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={especies.map((item) => ({
        label: `${item.cientifico} - ${item.comun}`,
        id: `especieOption-${item.id}`,
      }))}
      renderInput={(params) => (
        <TextField {...params} label="Especie" required={props.required} />
      )}
      {...props}
    />
  );
}
