import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DispiniblidadesDeUnViveroInterface } from "@/prisma/queries/disponibilidadesQueries";
import axios from "axios";
import dayjs from "dayjs";
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
import { useDisponibilidadStore } from "@/hooks/disponibilidadStore";
import { ViveroSimpleInterface } from "@/prisma/queries/viverosQueries";
import { useAlert } from "@/hooks/alertStore";

export default function VistaVivero() {
  const lanzarAlerta = useAlert((state) => state.lanzarAlerta);
  const router = useRouter();
  const disponibilidadesDeUnVivero = useDisponibilidadStore(
    (state) => state.disponibilidadesDeUnVivero
  );
  const disponibilidad = useDisponibilidadStore(
    (state) => state.disponibilidad
  );

  const {
    getDisponibilidadesDeunVivero,
    setDisponibilidad,
    limpiarDatos: limpiarDisponilidad,
  } = useDisponibilidadStore();

  const [expanded, setExpanded] = useState<string | false>(false);
  const [rowSelected, setRowSelected] = useState<number | false>(false);

  const [vivero, setVivero] = useState<ViveroSimpleInterface>();

  const handleExpanded =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      if (!isExpanded) {
      }
    };

  useEffect(() => {
    limpiarDisponilidad("nada");
    if (router.query.id !== undefined) {
      getVivero();
      getDisponibilidadesDeunVivero(router.query.id).then((estado) => {
        if (estado.ok === false) {
          if (estado.error instanceof Error) {
            lanzarAlerta(estado.error.message, { severity: "error" });
          } else {
            lanzarAlerta("revisar consola, error desconocido", {
              severity: "error",
            });
            console.log(estado.error);
          }
        }
      });
    }
  }, [router.query.id]);

  const getVivero = async () => {
    await axios
      .get(`/api/viveros/${router.query.id}`)
      .then(({ data }) => {
        setVivero(data);
        setDisponibilidad({ ...disponibilidad, vivero: data });
        limpiarDisponilidad("vivero");
        //? console.log(data);
      })
      .catch((error) => {
        lanzarAlerta("No se pudo recuperar vivero", { severity: "error" });
      });
  };

  const handleOnclickRow = (
    disponibilidadSeleccionada: DispiniblidadesDeUnViveroInterface
  ) => {
    if (expanded === false) {
      if (rowSelected === false) {
        setRowSelected(disponibilidadSeleccionada.id);
      } else if (rowSelected === disponibilidadSeleccionada.id) {
        setDisponibilidad({
          ...disponibilidad,
          id: disponibilidadSeleccionada.id,
          disponibles: disponibilidadSeleccionada.disponibles,
          enProceso: disponibilidadSeleccionada.enProceso,
          fecha: disponibilidadSeleccionada.fecha,
          especie: disponibilidadSeleccionada.especie,
        });
        setExpanded("panel-vivero");
      } else {
        setRowSelected(disponibilidadSeleccionada.id);
      }
    } else {
      if (rowSelected === disponibilidadSeleccionada.id) {
        limpiarDisponilidad("vivero");
        setRowSelected(false);
        setExpanded(false);
      } else {
        limpiarDisponilidad("vivero");
        setExpanded(false);
        setRowSelected(disponibilidadSeleccionada.id);
      }
    }
  };

  const handleClickAdd = () => {
    setRowSelected(false);
    setExpanded("panel-vivero");
    limpiarDisponilidad("vivero");
  };

  return (
    <div className="h-full flex flex-col">
      <Accordion
        expanded={
          expanded === "panel-vivero" || disponibilidadesDeUnVivero.length === 0
        }
        onChange={handleExpanded("panel-vivero")}
        className="shadow-none"
      >
        <AccordionSummary
          expandIcon={
            <Fab
              color={`${disponibilidad.id === "" ? "success" : "warning"}`}
              aria-label="add"
              size="small"
              onClick={() => handleClickAdd()}
            >
              {disponibilidad.id === "" ? <AddIcon /> : <EditIcon />}
            </Fab>
          }
          aria-controls="panel-datos-personales"
          id="panel-datos-personales"
          onClick={() => limpiarDisponilidad("vivero")}
          className="flex justify-between"
        >
          <Typography>Vivero {!vivero ? "..." : vivero.nombre}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DisponibilidadForm />
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
            {disponibilidadesDeUnVivero.map((disponibilidadItem) => (
              <TableRow
                key={`disponiblidad-v-row-${disponibilidadItem.id}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => handleOnclickRow(disponibilidadItem)}
                className={
                  disponibilidadItem.id === rowSelected ||
                  (disponibilidadItem.id === disponibilidad.id &&
                    disponibilidadItem.id === rowSelected)
                    ? "transition ease-in duration-100 bg-gray-200 cursor-pointer hover:bg-gray-300"
                    : "transition ease-in duration-75 cursor-pointer hover:bg-gray-50"
                }
              >
                <TableCell>{disponibilidadItem.especie.comun}</TableCell>
                <TableCell>{disponibilidadItem.especie.cientifico}</TableCell>
                <TableCell align="right">
                  {dayjs(disponibilidadItem.fecha).format("LLL")}
                </TableCell>
                <TableCell align="right">
                  {disponibilidadItem.enProceso}
                </TableCell>
                <TableCell align="right">
                  {disponibilidadItem.disponibles}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
