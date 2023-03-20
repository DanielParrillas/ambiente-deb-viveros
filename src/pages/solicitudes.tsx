import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { trpc } from "../utils/trpc";

import { stableSort, getComparator, Order } from "@/src/utils/tableUtils";
import EncabezadoTabla, { HeadCell } from "@/src/components/tables/Encabezado";
import { useState } from "react";

interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

const headCells: HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Dessert (100g serving)",
  },
  {
    id: "calories",
    numeric: true,
    disablePadding: false,
    label: "Calories",
  },
  {
    id: "fat",
    numeric: true,
    disablePadding: false,
    label: "Fat (g)",
  },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "Carbs (g)",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "Protein (g)",
  },
];

export default function Solicitudes() {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("calories");
  const [rows, setRows] = useState<Data[]>([]);
  const disponibilidadQuery = trpc.solicitud.lista.useQuery();

  React.useEffect(() => {
    console.log(disponibilidadQuery.data);
  }, [disponibilidadQuery.data]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {};

  return (
    <TableContainer>
      <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
        <EncabezadoTabla
          headCells={headCells}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          rowCount={rows.length}
        />
        <TableBody>
          {stableSort(rows, getComparator(order, orderBy)).map(
            (row: Data, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.name)}
                  role="checkbox"
                  tabIndex={-1}
                  key={row.name}
                >
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
