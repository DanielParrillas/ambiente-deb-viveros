import useSWR, { Fetcher } from "swr";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import CheckIcon from "@mui/icons-material/Check";
import { Vivero } from "@prisma/client";

interface ViveroDetail extends Vivero {}
const fetcher: Fetcher<ViveroDetail[], string> = (url: string) =>
  axios.get(url).then((res) => res.data);

export default function Viveros() {
  const {
    data: viveros,
    error,
    isLoading,
    isValidating,
  } = useSWR("/api/viveros", fetcher);
  if (error) return <div>Failed to load</div>;
  if (!viveros) return <div>Loading...</div>;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Estado</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Dirección</TableCell>
            <TableCell align="right">Meta</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {viveros.map((vivero) => (
            <TableRow
              key={`vivero-row-${vivero.id}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {vivero.estaActivo === 0 ? (
                  <DoNotDisturbAltIcon />
                ) : (
                  <CheckIcon />
                )}
              </TableCell>
              <TableCell>{vivero.nombre}</TableCell>
              <TableCell>{vivero.direccion}</TableCell>
              <TableCell align="right">{vivero.meta}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
