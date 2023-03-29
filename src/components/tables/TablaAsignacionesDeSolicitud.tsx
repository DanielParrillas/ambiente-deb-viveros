import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { getComparator, stableSort } from "@/src/utils/sort";
import type { Order } from "@/src/utils/tableUtils";
import { useRouter } from "next/router";
import { useSolicitudStore } from "@/src/hooks/solicitudStore";

export interface Data {
  comun: string;
  cientifico: string;
  vivero: string;
  id: number;
  cantidad: number;
}

interface HeadCell {
  id: keyof Data;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: "cientifico",
    label: "Científico",
  },
  {
    id: "comun",
    label: "Común",
  },
  {
    id: "vivero",
    label: "Vivero",
  },
  {
    id: "cantidad",
    label: "Cantidad",
  },
];

interface TablaSolicitudesProps {
  rows: Data[];
}

export default function TablaSolicitudes({ rows }: TablaSolicitudesProps) {
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("cientifico");
  const [selected, setSelected] = React.useState<number | false>(false);
  const { setSolicitud, solicitud } = useSolicitudStore();

  let seleccionPrevia: typeof selected = selected;

  const router = useRouter();

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (solicitudId: number) => {
    if (selected === false) {
      setSelected(solicitudId);
      seleccionPrevia = solicitudId;
    } else {
      if (seleccionPrevia === solicitudId) {
        //router.push(`/solicitudes/${solicitudId}`);
      } else {
        setSelected(false);
        seleccionPrevia = false;
      }
    }
  };

  return (
    <TableContainer className="bg-white h-full rounded-lg select-none">
      <Table aria-labelledby="tableTitle" stickyHeader>
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {stableSort(
            solicitud.asignaciones.map((solicitud) => ({
              cantidad: solicitud.cantidadEntregada,
              cientifico: solicitud.especie.cientifico,
              comun: solicitud.especie.comun,
              id: solicitud.id,
              vivero: solicitud.vivero.nombre,
            })),
            getComparator(order, orderBy)
          ).map((row, index) => {
            return (
              <TableRow
                hover
                onClick={(event) => handleClick(row.id)}
                role="checkbox"
                tabIndex={-1}
                key={`solicitud-fila-${row.id}`}
                className={
                  row.id === selected
                    ? "transition ease-in duration-100 bg-gray-200 cursor-pointer hover:bg-gray-300"
                    : "transition ease-in duration-75 cursor-pointer hover:bg-gray-50"
                }
              >
                <TableCell component="th" scope="row">
                  {row.cientifico}
                </TableCell>
                <TableCell>{row.comun}</TableCell>
                <TableCell>{row.vivero}</TableCell>
                <TableCell align="right">{row.cantidad}</TableCell>
              </TableRow>
            );
          })}
          {solicitud.asignaciones.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="animate-pulse">
                sin asignaciones
              </TableCell>
            </TableRow>
          )}
          {solicitud.asignaciones.length > 0 && (
            <TableRow>
              <TableCell colSpan={3} className="font-bold" align="right">
                Total
              </TableCell>
              <TableCell align="right">
                {solicitud.asignaciones.reduce(
                  (acumulador, asignacion) =>
                    acumulador + asignacion.cantidadEntregada,
                  0
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            className="bg-teal-600 text-white cursor-pointer"
            onClick={createSortHandler(headCell.id)}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
