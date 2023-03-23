import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { Chip } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import dayjs from "dayjs";
import { getComparator, stableSort } from "@/src/utils/sort";
import type { Order } from "@/src/utils/tableUtils";
import { useRouter } from "next/router";

export interface Data {
  nombreCompleto: string;
  estado: string;
  fecha: string;
  id: number;
  institucion: string;
  notas: string;
  cantidadSolicitadaTotal: number;
}

interface HeadCell {
  id: keyof Data;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: "fecha",
    label: "Fecha",
  },
  {
    id: "nombreCompleto",
    label: "Solicitante",
  },
  {
    id: "institucion",
    label: "Institucion",
  },
  {
    id: "estado",
    label: "Estado",
  },
  { id: "cantidadSolicitadaTotal", label: "Solicitado" },
];

interface TablaSolicitudesProps {
  rows: Data[];
}

export default function TablaSolicitudes({ rows }: TablaSolicitudesProps) {
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("fecha");
  const [selected, setSelected] = React.useState<number | false>(false);

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
        router.push(`/solicitudes/detalle`);
      } else {
        setSelected(false);
        seleccionPrevia = false;
      }
    }
  };

  return (
    <TableContainer className="bg-white h-fit shadow-lg rounded-lg select-none">
      <Table aria-labelledby="tableTitle" stickyHeader>
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
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
                  {dayjs(row.fecha).format("LL")}
                </TableCell>
                <TableCell>{row.nombreCompleto}</TableCell>
                <TableCell>
                  {row.institucion.toLocaleLowerCase() === "persona natural" ? (
                    <Chip label="Persona natural" />
                  ) : (
                    row.institucion
                  )}
                </TableCell>
                <TableCell>
                  {row.estado.toLocaleLowerCase() === "pendiente" ? (
                    <Chip label={row.estado} color="warning" />
                  ) : (
                    row.estado
                  )}
                </TableCell>
                <TableCell align="right">
                  {row.cantidadSolicitadaTotal}
                </TableCell>
              </TableRow>
            );
          })}
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={4}>cargando...</TableCell>
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
            className="bg-marn-light text-white cursor-pointer"
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
