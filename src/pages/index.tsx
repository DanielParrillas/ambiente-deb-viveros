import Example from "@/src/components/chart/firtChart";
import { useEffect } from "react";
import { trpc } from "../utils/trpc";
import axios from "axios";

export default function Home() {
  const hello = trpc.hello.useQuery({ text: "client" });

  useEffect(() => {
    console.log(hello.data);
    asdf();
  }, [hello.data]);

  const asdf = async () => {
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      userId: "bparrillas",
      password: "bparrillas",
    });

    await fetch(
      "http://sgda.marn.gob.sv/alfresco/api/-default-/public/authentication/versions/1/tickets",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    )
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return <Example />;
}
