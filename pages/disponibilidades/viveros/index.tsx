import useSWR, { Fetcher } from "swr";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ViveroDisponibilidadInterface } from "../../api/viveros/disponibilidades";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const fetcher: Fetcher<ViveroDisponibilidadInterface[], string> = (
  url: string
) => axios.get(url).then((res) => res.data);
export default function TablaViveros() {
  const router = useRouter();
  const { data: viveros, error } = useSWR(
    "/api/viveros/disponibilidades",
    fetcher
  );
  const [rowSelected, setRowSelected] = useState<string | false>(false);

  if (error) return <div>Failed to load</div>;
  if (!viveros) return <div>Loading...</div>;

  const handleOnclickRow = (viveroId: number) => {
    if (rowSelected === `vivero-row-${viveroId}`) {
      router.push(`/disponibilidades/viveros/${viveroId}`);
    } else {
      setRowSelected(`vivero-row-${viveroId}`);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className="bg-marn-light text-white">Nombre</TableCell>
              <TableCell className="bg-marn-light text-white">
                En Proceso
              </TableCell>
              <TableCell
                align="right"
                className="bg-marn-light text-white rounded-tr-md"
              >
                Disponibles
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {viveros.map((vivero) => (
              <TableRow
                key={`vivero-row-${vivero.id}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => handleOnclickRow(vivero.id)}
                className={
                  `vivero-row-${vivero.id}` === rowSelected
                    ? " bg-gray-200 cursor-pointer hover:bg-gray-300"
                    : "cursor-pointer hover:bg-gray-50"
                }
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
    </div>
  );
}
