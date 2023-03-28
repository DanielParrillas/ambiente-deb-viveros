import Link from "next/link";
import { useRouter } from "next/router";

const createDisponiblidadLink = (url: string, label: string) => {
  return { ulr: url, label: label };
};

export default function Disponibilidades() {
  const router = useRouter();
  let links = [
    createDisponiblidadLink(`${router.pathname}/viveros`, "Por viveros"),
    createDisponiblidadLink(`${router.pathname}/especies`, "Por especies"),
  ];

  return (
    <div className="h-full grid md:grid-cols-2 p-16 gap-16">
      <Link
        href="disponibilidades/viveros"
        className="shadow-sm transition ease-in-out duration-200 grid content-center p-4 md:basis-1/2 rounded-xl bg-white hover:shadow-lg"
      >
        <div className="w-full h-full">
          <h2 className="text-center text-gray-700">Por viveros</h2>
        </div>
      </Link>
      <Link
        href="disponibilidades"
        className="transition shadow-sm ease-in-out duration-200 grid content-center p-4 md:basis-1/2 rounded-xl bg-white opacity-50 cursor-default"
      >
        <div className="w-full h-full">
          <h2 className="text-center text-gray-700">Por especies</h2>
        </div>
      </Link>
    </div>
  );
}
