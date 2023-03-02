import { useRouter } from "next/router";
import { DispiniblidadPorViveroInterface } from "../../api/viveros/disponibilidades/[id]";
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

const fetcherVivero: Fetcher<DispiniblidadPorViveroInterface[], string> = (
  url: string
) => axios.get(url).then((res) => res.data);

export default function VistaVivero() {
  const router = useRouter();
  const {
    data: disponibilidades,
    error,
    isLoading,
    isValidating,
  } = useSWR(`/api/viveros/disponibilidades/${router.query.id}`, fetcherVivero);

  if (error) return <div>Failed to load</div>;
  if (!disponibilidades) return <div>Loading...</div>;
  console.log(disponibilidades);

  return (
    <>
      <h1 className="text-xl">Vivero {}</h1>
      <h4>Direccion {}</h4>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Común</TableCell>
              <TableCell>Especie</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell align="right">En proceso</TableCell>
              <TableCell align="right">Disponibles</TableCell>
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
    </>
  );
}
