import Example from "@/src/components/chart/firtChart";
import { useEffect } from "react";
import { trpc } from "../utils/trpc";
import axios from "axios";

import ExampleSelectingAndSortingTable from "../components/table/ExampleSAST";

export default function Home() {
  const hello = trpc.hello.useQuery({ text: "client" });

  useEffect(() => {
    console.log(hello.data);
  }, [hello.data]);

  return <ExampleSelectingAndSortingTable />;
}
