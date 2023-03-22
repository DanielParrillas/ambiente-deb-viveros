import SortingTable from "./SortingTable";
interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
): Data {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

interface DataCell {
  value: string | number;
  content: string | JSX.Element;
}

const rows = [
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Cupcdfsake", 305, 3.7, 67, 4.3),
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
  return (
    <SortingTable
      filas={rows}
      encabezados={headCells}
      encabezadoCellGeneralProps={{ className: "p-4 bg-marn-light text-white" }}
    />
  );
}
