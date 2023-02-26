import useSWR, { Fetcher } from "swr";
import axios from "axios";
import {
  ViveroDisponibilidadEspecies,
  ViveroEspecie,
  Vivero,
} from "@prisma/client";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Collapse,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import { Fragment } from "react";

interface Disponibilidad
  extends Omit<ViveroDisponibilidadEspecies, "viveroId" | "especieId"> {
  especie: Omit<ViveroEspecie, "tipoId" | "estadoId" | "categoriaId">;
}

interface ViveroDisponibilidad {
  id: number;
  nombre: string;
  disponibilidadesPorEspecie: Disponibilidad[];
}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  price: number
) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}
const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
  createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
];

function Row(props: { row: ViveroDisponibilidad }) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.nombre}
        </TableCell>
        <TableCell align="right">{row.id}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detalla por especie
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Cientifico</TableCell>
                    <TableCell>Comun</TableCell>
                    <TableCell align="right">Fecha</TableCell>
                    <TableCell align="right">En proceso</TableCell>
                    <TableCell align="right">Disponibles</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.disponibilidadesPorEspecie.map((disponibilidad) => (
                    <TableRow key={`disp-${disponibilidad.id}`}>
                      <TableCell component="th" scope="row">
                        {disponibilidad.especie.cientifico}
                      </TableCell>
                      <TableCell>{disponibilidad.especie.comun}</TableCell>
                      <TableCell align="right">
                        {String(disponibilidad.fecha)}
                      </TableCell>
                      <TableCell align="right">
                        {disponibilidad.enProceso}
                      </TableCell>
                      <TableCell align="right">
                        {disponibilidad.disponibles}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}
const fetcher: Fetcher<ViveroDisponibilidad[], string> = (url: string) =>
  axios.get(url).then((res) => res.data);
export default function Disponibilidad() {
  const {
    data: viveros,
    error,
    isLoading,
    isValidating,
  } = useSWR("/api/disponibilidad/viveros", fetcher);
  if (error) return <div>Failed to load</div>;
  if (!viveros) return <div>Loading...</div>;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Vivero</TableCell>
            <TableCell align="right">Total de Plantas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {viveros.map((vivero) => (
            <Row key={`viv-disp=${vivero.id}`} row={vivero} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
