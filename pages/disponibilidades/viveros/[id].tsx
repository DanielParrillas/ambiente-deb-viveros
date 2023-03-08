import { useState } from "react";
import { useRouter } from "next/router";
import useSWR, { Fetcher } from "swr";
import { DispiniblidadPorViveroInterface } from "../../api/disponibilidades/[id]";
import { ViveroInterface } from "@/pages/api/viveros/[id]";
import axios from "axios";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/es-mx";
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
import EditIcon from "@mui/icons-material/Edit";
import DisponibilidadForm from "@/components/form/DisponibilidadForm";

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
    `/api/disponibilidades/${router.query.id}`,
    fetcherDisponibilidades
  );
  const [expanded, setExpanded] = useState<string | false>(false);
  const [rowSelected, setRowSelected] = useState<number | false>(false);
  const [modo, setModo] = useState<"nuevo" | "edicion">("nuevo");

  const handleExpanded =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      if (!isExpanded) {
        setModo("nuevo");
      }
    };

  const handleOnclickRow = (
    disponibilidadId: DispiniblidadPorViveroInterface
  ) => {
    if (expanded === false) {
      if (rowSelected === false) {
        setRowSelected(disponibilidadId.id);
        setModo("nuevo");
      } else if (rowSelected === disponibilidadId.id) {
        setExpanded("panel-vivero");
        setModo("edicion");
      } else {
        setRowSelected(disponibilidadId.id);
        setModo("nuevo");
      }
    } else {
      if (rowSelected === disponibilidadId.id) {
        setRowSelected(false);
        setExpanded(false);
        setModo("nuevo");
      } else {
        setExpanded(false);
        setRowSelected(disponibilidadId.id);
        setModo("nuevo");
      }
    }
  };

  const handleClickAdd = () => {
    setRowSelected(false);
    setExpanded("panel-vivero");
  };

  if (errorDisponibilidades | errorVivero) return <div>Failed to load</div>;

  if (!disponibilidades || !vivero) {
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
                color="success"
                aria-label="add"
                size="small"
                className="order-last"
              >
                <AddIcon />
              </Fab>
            }
            aria-controls="panel-datos-personales"
            id="panel-datos-personales"
            className="flex justify-between"
          >
            Vivero ...
          </AccordionSummary>
          <AccordionDetails>
            <DisponibilidadForm modo={modo} />
          </AccordionDetails>
        </Accordion>
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
              <TableRow>
                <TableCell>cargando...</TableCell>
                <TableCell>cargando...</TableCell>
                <TableCell>cargando...</TableCell>
                <TableCell>cargando...</TableCell>
                <TableCell>cargando...</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
  return (
    <div className="h-full flex flex-col">
      <Accordion
        expanded={expanded === "panel-vivero" || disponibilidades.length === 0}
        onChange={handleExpanded("panel-vivero")}
        className="shadow-none"
      >
        <AccordionSummary
          expandIcon={
            <Fab
              color={`${modo === "nuevo" ? "success" : "warning"}`}
              aria-label="add"
              size="small"
              onClick={() => handleClickAdd()}
            >
              {modo === "nuevo" ? <AddIcon /> : <EditIcon />}
            </Fab>
          }
          aria-controls="panel-datos-personales"
          id="panel-datos-personales"
          className="flex justify-between"
        >
          <Typography>Vivero {!vivero ? "..." : vivero.nombre}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DisponibilidadForm modo={modo} />
        </AccordionDetails>
      </Accordion>
      <TableContainer component={Paper} className="h-full">
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          stickyHeader
          className="select-none"
        >
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
                onClick={() => handleOnclickRow(disponibilidad)}
                className={
                  disponibilidad.id === rowSelected
                    ? "transition ease-in duration-100 bg-gray-200 cursor-pointer hover:bg-gray-300"
                    : "transition ease-in duration-75 cursor-pointer hover:bg-gray-50"
                }
              >
                <TableCell>{disponibilidad.especie.comun}</TableCell>
                <TableCell>{disponibilidad.especie.cientifico}</TableCell>
                <TableCell align="right">
                  {dayjs().calendar(dayjs(disponibilidad.fecha))}
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
