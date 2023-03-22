import SortingTable from "./SortingTable";
interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

interface DataCell {
  value: string | number;
  content: string | JSX.Element;
}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return {
    name: { value: name, content: name },
    calories: { value: calories, content: calories },
    fat: { value: fat, content: fat },
    carbs: { value: carbs, content: carbs },
    protein: { value: protein, content: protein },
  };
}

const rows = [
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const headCells = [
  {
    id: "name",
    label: "Dessert (100g serving)",
  },
  {
    id: "calories",
    label: "Calories",
  },
  {
    id: "fat",
    label: "Fat (g)",
  },
  {
    id: "carbs",
    label: "Carbs (g)",
  },
  {
    id: "protein",
    label: "Protein (g)",
  },
];

export default function ExampleSelectingAndSortingTable() {
  const handleClick = (solicitudId: number) => {};
  return (
    <SortingTable
      filas={rows}
      encabezados={headCells}
      encabezadoCellGeneralProps={{ className: "p-4 bg-marn-light text-white" }}
    />
  );
}
