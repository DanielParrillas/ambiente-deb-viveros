import { useRouter } from "next/router";
import { DispiniblidadPorViveroInterface } from "../../api/viveros/disponibilidades/[id]";
import { ViveroInterface } from "@/pages/api/viveros/[id]";
import useSWR, { Fetcher } from "swr";
import axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Fab,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { useState } from "react";

const fetcherDisponibilidades: Fetcher<
  DispiniblidadPorViveroInterface[],
  string
> = (url: string) => axios.get(url).then((res) => res.data);

const fetcherVivero: Fetcher<ViveroInterface, string> = (url: string) =>
  axios.get(url).then((res) => res.data);

export default function VistaVivero() {
  const router = useRouter();
  const { data: vivero, error: errorVivero } = useSWR(
    `/api/viveros/${router.query.id}`,
    fetcherVivero
  );
  const { data: disponibilidades, error: errorDisponibilidades } = useSWR(
    `/api/viveros/disponibilidades/${router.query.id}`,
    fetcherDisponibilidades
  );
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleExpanded =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  if (errorDisponibilidades | errorVivero) return <div>Failed to load</div>;

  if (!vivero) {
    return (
      <>
        <h1 className="text-xl">Vivero ...</h1>
        <h4>Direccion</h4>
      </>
    );
  }

  if (!disponibilidades) {
    return (
      <>
        <h1 className="text-xl">Vivero {vivero.nombre}</h1>
        <h4>
          Direccion{" "}
          {`${vivero.municipio.nombre}, ${vivero.municipio.departamento.nombre}`}
        </h4>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="bg-marn-light text-white">
                  Común
                </TableCell>
                <TableCell className="bg-marn-light text-white">
                  Especie
                </TableCell>
                <TableCell className="bg-marn-light text-white">
                  Fecha
                </TableCell>
                <TableCell align="right" className="bg-marn-light text-white">
                  En proceso
                </TableCell>
                <TableCell align="right" className="bg-marn-light text-white">
                  Disponibles
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell>...</TableCell>
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <Accordion
        expanded={expanded === "panel-vivero"}
        onChange={handleExpanded("panel-vivero")}
        className="shadow-none"
      >
        <AccordionSummary
          expandIcon={
            <Fab
              color="primary"
              aria-label="add"
              size="small"
              className="order-last shadow-none bg-blue-800"
            >
              <AddIcon />
            </Fab>
          }
          aria-controls="panel-datos-personales"
          id="panel-datos-personales"
          className="flex justify-between"
        >
          <Typography>Vivero {!vivero ? "..." : vivero.nombre}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <p>
            Departamento:
            {`${vivero.municipio.departamento.nombre}`}
          </p>
          <p>Municipio: {`${vivero.municipio.nombre}`}</p>
          <p>Meta: {`${vivero.meta}`}</p>
          <p>Direccion: {`${vivero.direccion}`}</p>
        </AccordionDetails>
      </Accordion>
      <TableContainer component={Paper} className="h-full">
        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
          <TableHead className="mt-16">
            <TableRow>
              <TableCell className="bg-marn-light text-white">Común</TableCell>
              <TableCell className="bg-marn-light text-white">
                Especie
              </TableCell>
              <TableCell className="bg-marn-light text-white">Fecha</TableCell>
              <TableCell align="right" className="bg-marn-light text-white">
                En proceso
              </TableCell>
              <TableCell align="right" className="bg-marn-light text-white">
                Disponibles
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {disponibilidades.map((disponibilidad) => (
              <TableRow
                key={`disponiblidad-v-row-${disponibilidad.id}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{disponibilidad.especie.comun}</TableCell>
                <TableCell>{disponibilidad.especie.cientifico}</TableCell>
                <TableCell align="right">
                  {String(disponibilidad.fecha)}
                </TableCell>
                <TableCell align="right">{disponibilidad.enProceso}</TableCell>
                <TableCell align="right">
                  {disponibilidad.disponibles}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
