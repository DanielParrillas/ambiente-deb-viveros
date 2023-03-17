//* Form
import {
  Autocomplete,
  TextField,
  FormControl,
  InputLabel,
  Input,
  Button,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Fab,
} from "@mui/material";
//*Table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
//* Icons
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import ForestIcon from "@mui/icons-material/Forest";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { forwardRef, useState } from "react";
import { IMaskInput } from "react-imask";
import axios from 'axios';

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

  const [expanded, setExpanded] = useState<string | false>(
    "panel-datos-personales"
  );

  const handleExpanded =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await axios.post(`/api/disponibilidades`)
  };

  return (
    <form onSubmit={handleSubmit} className="h-full p-4">
      <Accordion
        expanded={expanded === "panel-datos-personales"}
        onChange={handleExpanded("panel-datos-personales")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-datos-personales"
          id="panel-datos-personales"
        >
          <Typography>Datos personales</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel-detalle-plantas"}
        onChange={handleExpanded("panel-detalle-plantas")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-detalle-plantas"
          id="panel-detalle-plantas"
        >
          <Typography>Detalle de plantas</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="grid gap-4 grid-cols-1">
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <Autocomplete
                id="combo-box-especie"
                options={["Mango", "Pepeto", "Pino"]}
                className="w-full sm:basis-1/2"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    variant="standard"
                    color="success"
                    label="Especie"
                  />
                )}
              />
              <TextField
                required
                variant="standard"
                color="success"
                type={"number"}
                label={"Cantidad"}
                className="w-full sm:basis-1/3"
              />
              <Fab
                size="small"
                color="success"
                aria-label="add"
                className="bg-green-800 hover:bg-green-700"
              >
                <AddIcon />
              </Fab>
            </div>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell width={1}></TableCell>
                    <TableCell className="font-bold">Especie</TableCell>
                    <TableCell className="font-bold">Cantidad</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    key={"row.name"}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="">
                      <Fab
                        size="small"
                        color="error"
                        aria-label="add"
                        className="bg-red-800 hover:bg-red-700"
                      >
                        <RemoveIcon />
                      </Fab>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Mango
                    </TableCell>
                    <TableCell align="left">23</TableCell>
                  </TableRow>
                  <TableRow
                    key={"row.name"}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="">
                      <Fab
                        size="small"
                        color="error"
                        aria-label="add"
                        className="bg-red-800 hover:bg-red-700"
                      >
                        <RemoveIcon />
                      </Fab>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Pera
                    </TableCell>
                    <TableCell align="left">27</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="right" className="font-bold">
                      Total
                    </TableCell>
                    <TableCell className="font-bold">50</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </AccordionDetails>
      </Accordion>
      <div className="flex justify-center pt-4">
        <Button
          variant="contained"
          color="success"
          className="bg-green-800 focus-visible:bg-green-700 focus-within:bg-green-700 focus:bg-green-700 active:bg-green-700 w-24 h-10"
          onSubmit={(e) => console.log(e)}
        >
          Solicitar
        </Button>
      </div>
    </form>
  );
}
