import useSWR, { Fetcher } from "swr";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ViveroDisponibilidadInterface } from "../api/viveros/disponibilidades";
import Link from "next/link";
import { useRouter } from "next/router";

const fetcher: Fetcher<ViveroDisponibilidadInterface[], string> = (
  url: string
) => axios.get(url).then((res) => res.data);
export default function TablaViveros() {
  const router = useRouter();
  const {
    data: viveros,
    error,
    isLoading,
    isValidating,
  } = useSWR("/api/viveros/disponibilidades", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!viveros) return <div>Loading...</div>;

  const handleOnclickRow = (viveroId: number) => {
    router.push(`viveros/disponibilidades/${viveroId}`);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>En Proceso</TableCell>
            <TableCell align="right">Disponibles</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {viveros.map((vivero) => (
            <TableRow
              key={`vivero-row-${vivero.id}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              onClick={() => handleOnclickRow(vivero.id)}
            >
              <TableCell>{vivero.nombre}</TableCell>

              <TableCell align="right">
                {vivero.disponibilidadesPorEspecie.reduce(
                  (acumulador, { enProceso }) => acumulador + enProceso,
                  0
                )}
              </TableCell>
              <TableCell align="right">
                {vivero.disponibilidadesPorEspecie.reduce(
                  (acumulador, { disponibles }) => acumulador + disponibles,
                  0
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
