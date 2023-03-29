import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSolicitudStore } from "@/src/hooks/solicitudStore";

export default function TablaAsignacionesDeSolicitud() {
  const { solicitud } = useSolicitudStore();
  return (
    <TableContainer className="rounded-md">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="bg-teal-600 text-white">Común</TableCell>
            <TableCell className="bg-teal-600 text-white">Científico</TableCell>
            <TableCell className="bg-teal-600 text-white">Vivero</TableCell>
            <TableCell align="right" className="bg-teal-600 text-white">
              Cantidad
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {solicitud.asignaciones.map((asignacion) => (
            <TableRow
              key={`detalle-especie-${asignacion.id}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {asignacion.especie?.cientifico}
              </TableCell>
              <TableCell>{asignacion.especie?.comun}</TableCell>
              <TableCell>{asignacion.vivero.nombre}</TableCell>
              <TableCell align="right">{asignacion.id}</TableCell>
            </TableRow>
          ))}
          {solicitud.asignaciones.length === 0 && (
            <TableRow>
              <TableCell colSpan={3}>
                <p className="text-gray-500">sin asignaciones</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
