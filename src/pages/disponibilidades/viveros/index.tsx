import useSWR, { Fetcher } from "swr";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DisponibilidadesPorViveroInterface } from "@/prisma/queries/disponibilidadesQueries";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDisponibilidadStore } from "@/src/hooks/disponibilidadStore";

const fetcher: Fetcher<DisponibilidadesPorViveroInterface[], string> = (
  url: string
) =>
  axios
    .get(url, {
      params: {
        por: "vivero",
      },
    })
    .then((res) => res.data);
export default function TablaViveros() {
  const router = useRouter();
  const { data: viveros, error } = useSWR("/api/disponibilidades", fetcher);
  const [rowSelected, setRowSelected] = useState<string | false>(false);
  const setDisponibilidad = useDisponibilidadStore(
    (state) => state.setDisponibilidad
  );

  if (error)
    return (
      <div className="h-full flex flex-col">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className="bg-marn-light text-white">
                  Nombre
                </TableCell>
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
              <TableRow>
                <TableCell className="text-red-900">
                  no se pudo recuperar ningun vivero
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  if (!viveros)
    return (
      <div className="h-full flex flex-col">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className="bg-marn-light text-white">
                  Nombre
                </TableCell>
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
              <TableRow>
                <TableCell>cargando...</TableCell>
                <TableCell>cargando...</TableCell>
                <TableCell align="right">cargando...</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );

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
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          stickyHeader
          className="select-none"
        >
          <TableHead>
            <TableRow>
              <TableCell className="bg-teal-600 text-white">Nombre</TableCell>
              <TableCell className="bg-teal-600 text-white">
                En Proceso
              </TableCell>
              <TableCell
                align="right"
                className="bg-teal-600 text-white rounded-tr-md"
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
                    ? "transition ease-in duration-100 bg-gray-200 cursor-pointer hover:bg-gray-300"
                    : "transition ease-in duration-75 cursor-pointer hover:bg-gray-50"
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
