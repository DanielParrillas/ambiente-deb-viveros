import Example from "@/src/components/chart/barchart";
import Piechart from "@/src/components/chart/piechart";

export default function Dashboard() {
  return (
    <div className="aspect-square flex flex-col">
      <Piechart />
      <Example />
    </div>
  );
}
