//MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { Chip } from "@mui/material";
//
import { stableSort, getComparator, Order } from "@/src/utils/tableUtils";
import EncabezadoTabla, { HeadCell } from "@/src/components/table/Encabezado";
import { useEffect, useState } from "react";
import { trpc } from "@/src/utils/trpc";
import { useAlert } from "@/src/hooks/alertStore";

interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

const headCells: HeadCell[] = [
  {
    id: "fechaDeSolicitud",
    numeric: false,
    disablePadding: true,
    label: "Fecha",
  },
  {
    id: "nombreDelSolicitante",
    numeric: false,
    disablePadding: false,
    label: "Nombre",
  },
  {
    id: "institucionSolicitante",
    numeric: false,
    disablePadding: false,
    label: "Institución",
  },
  {
    id: "estado.id",
    numeric: false,
    disablePadding: false,
    label: "Estado",
  },
  {
    id: "notas",
    numeric: false,
    disablePadding: false,
    label: "Notas",
  },
];

export default function Solicitudes() {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("calories");
  const { lanzarAlerta } = useAlert();
  const solicitudQuery = trpc.solicitud.lista.useQuery();

  useEffect(() => {
    if (solicitudQuery.isError)
      lanzarAlerta(solicitudQuery.error.message, { severity: "error" });
  }, [solicitudQuery.isError]);

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
          rowCount={
            solicitudQuery.data?.lista ? solicitudQuery.data.lista.length : 0
          }
        />
        {solicitudQuery.data === undefined ? (
          <TableBody></TableBody>
        ) : (
          <TableBody>
            {stableSort(
              solicitudQuery.data.lista,
              getComparator(order, orderBy)
            ).map((row: typeof solicitudQuery.data.lista[0], index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  onClick={(event) =>
                    handleClick(event, row.nombreDelSolicitante)
                  }
                  role="checkbox"
                  tabIndex={-1}
                  key={`row-solicitud-${row.id}`}
                >
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {row.fechaDeSolicitud}
                  </TableCell>
                  <TableCell align="right">
                    {`${row.nombreDelSolicitante} ${row.apellidoDelSolicitante}`}
                  </TableCell>
                  <TableCell align="right">
                    {row.institucionSolicitante}
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={row.estado.nombre}
                      color={row.estado.id === 2 ? "success" : "default"}
                    />
                  </TableCell>
                  <TableCell align="right">{row.notas}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
