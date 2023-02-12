import {
  Autocomplete,
  TextField,
  FormControl,
  InputLabel,
  Input,
  Button,
  Box,
  Accordion,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import ForestIcon from "@mui/icons-material/Forest";
import { forwardRef, useState } from "react";
import { IMaskInput } from "react-imask";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="0000-0000"
        definitions={{
          "#": /[1-9]/,
        }}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

interface State {
  textmaskCelular: string;
  textmaskPhone: string;
}

export default function FormularioSolicitud() {
  const [values, setValues] = useState<State>({
    textmaskCelular: "",
    textmaskPhone: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <form className="h-full p-4 grid gap-4 grid-cols-1">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2 lg:gap-8">
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <PersonIcon
            sx={{ color: "action.active", mr: 1, my: 0.5 }}
            className="text-green-800"
          />
          <TextField
            className="w-full"
            required
            label={"Nombres"}
            variant="standard"
            color="success"
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <PersonOutlineOutlinedIcon
            sx={{ color: "action.active", mr: 1, my: 0.5 }}
            className="text-green-800"
          />
          <TextField
            className="w-full"
            required
            label={"Apellidos"}
            variant="standard"
            color="success"
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <CorporateFareIcon
            sx={{ color: "action.active", mr: 1, my: 0.5 }}
            className="text-green-800"
          />
          <TextField
            required
            className="w-full"
            label={"Organización"}
            variant="standard"
            color="success"
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <PhoneIphoneIcon
            sx={{ color: "action.active", mr: 1, my: 0.5 }}
            className="text-green-800"
          />
          <FormControl className="w-full" required>
            <InputLabel htmlFor="textmask-celular" color="success">
              Celular
            </InputLabel>
            <Input
              required
              value={values.textmaskCelular}
              onChange={handleChange}
              name={"textmaskCelular"}
              id="textmask-celular"
              color="success"
              inputComponent={TextMaskCustom as any}
            />
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <PhoneIcon
            sx={{ color: "action.active", mr: 1, my: 0.5 }}
            className="text-green-800"
          />
          <FormControl className="w-full">
            <InputLabel htmlFor="textmaskPhone" color="success">
              Teléfono
            </InputLabel>
            <Input
              required
              value={values.textmaskPhone}
              onChange={handleChange}
              name={"textmaskPhone"}
              id="textmaskPhone"
              color="success"
              inputComponent={TextMaskCustom as any}
            />
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <EmailIcon
            sx={{ color: "action.active", mr: 1, my: 0.5 }}
            className="text-green-800"
          />
          <TextField
            required
            label={"E-mail"}
            type="email"
            variant="standard"
            color="success"
            className="w-full"
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <ForestIcon
            sx={{ color: "action.active", mr: 1, my: 0.5 }}
            className="text-green-800"
          />
          <Autocomplete
            disablePortal
            id="combo-box-municipio"
            options={["Santo Tomas", "Santiago Texacuangos", "Suchitlan"]}
            className="w-full"
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Municipio donde reforestara"
                variant="standard"
                color="success"
              />
            )}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <PlaceIcon
            sx={{ color: "action.active", mr: 1, my: 0.5 }}
            className="text-green-800"
          />
          <TextField
            required
            className="w-full"
            label={"Colonia/Calle/Canton a reforestar"}
            variant="standard"
            color="success"
          />
        </Box>
      </div>
      <div className="flex justify-center">
        <Button
          className="bg-green-800 focus-visible:bg-green-800 focus-within:bg-green-800 focus:bg-green-800 active:bg-green-700 w-24 h-10"
          variant="contained"
          color="success"
          onSubmit={(e) => console.log(e)}
        >
          Enviar
        </Button>
      </div>
    </form>
  );
}
