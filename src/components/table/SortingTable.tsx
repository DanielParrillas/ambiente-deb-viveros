import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import type { TableCellProps } from "@mui/material/TableCell";
import type { TableRowProps } from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { useState } from "react";

export interface DataCell {
  value: string | number;
  content: string | JSX.Element;
}

function descendingComparator(a: any, b: any, orderBy: string) {
  if (b[orderBy].value < a[orderBy].value) {
    return -1;
  }
  if (b[orderBy].value > a[orderBy].value) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator(
  order: Order,
  orderBy: string
): (a: any, b: any) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(
  array: readonly any[],
  comparator: (a: any, b: any) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export interface Encabezado extends TableCellProps {
  id: string;
  label: string;
}

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderBy?: string;
  rowCount: number;
  encabezados: Encabezado[];
  encabezadoCellGeneralProps?: TableCellProps;
}

function SortingTableHead(props: EnhancedTableProps) {
  const {
    order,
    orderBy,
    encabezados,
    encabezadoCellGeneralProps,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {encabezados.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            {...encabezadoCellGeneralProps}
            {...headCell}
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

interface SortingTableProps {
  filas: Object[];
  encabezados: Encabezado[];
  encabezadoCellGeneralProps?: TableCellProps;
  CellGeneralProps?: TableCellProps;
  filaGeneralProps?: TableRowProps;
  ordenadoPor?: string;
}

export default function SortingTable({
  filas,
  filaGeneralProps,
  encabezados,
  encabezadoCellGeneralProps,
  ordenadoPor,
}: SortingTableProps) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string | undefined>(ordenadoPor);
  const [selected, setSelected] = useState<string>();

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <TableContainer className="h-full rounded-lg bg-white shadow-lg select-none">
      <Table aria-labelledby="tableTitle" stickyHeader>
        <SortingTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          rowCount={filas.length}
          encabezados={encabezados}
          encabezadoCellGeneralProps={encabezadoCellGeneralProps}
        />
        <TableBody>
          {(orderBy === undefined
            ? filas
            : stableSort(filas, getComparator(order, orderBy))
          ).map((row, index) => {
            return (
              <TableRow key={`${index}-row-sorting`} {...filaGeneralProps}>
                {encabezados.map((encabezado, cellIndex) => (
                  <TableCell key={`cell-${cellIndex}-${encabezado}`}>
                    {row[encabezado.id].content}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
