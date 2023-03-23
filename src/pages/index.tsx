import { useEffect } from "react";
import { trpc } from "../utils/trpc";

export default function Home() {
  const hello = trpc.hello.useQuery({ text: "client" });

  useEffect(() => {
    console.log(hello.data);
  }, [hello.data]);

  return <div>Index</div>;
}
