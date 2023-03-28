import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSolicitudStore } from "@/src/hooks/solicitudStore";

export default function TablaSolicituDetalle() {
  const { solicitud } = useSolicitudStore();

  return (
    <TableContainer className="rounded-md">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="bg-marn-light text-white">Común</TableCell>
            <TableCell className="bg-marn-light text-white">
              Científico
            </TableCell>
            <TableCell align="right" className="bg-marn-light text-white">
              Cantidad
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {solicitud.detalles.map((detalle) => (
            <TableRow
              key={`detalle-especie-${detalle.id}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {detalle.especie?.cientifico}
              </TableCell>
              <TableCell>{detalle.especie?.comun}</TableCell>
              <TableCell align="right">{detalle.cantidad}</TableCell>
            </TableRow>
          ))}
          {solicitud.detalles.length === 0 && (
            <TableRow>
              <TableCell colSpan={3}>
                <p className="text-gray-500">sin detalle</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
