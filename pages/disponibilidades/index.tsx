import Link from "next/link";
import { useRouter } from "next/router";

const createDisponiblidadLink = (url: string, label: string) => {
  return { ulr: url, label: label };
};

export default function Disponibilidades() {
  const router = useRouter();
  const links = [
    createDisponiblidadLink(`${router.pathname}/viveros`, "Por viveros"),
    createDisponiblidadLink(`${router.pathname}/especies`, "Por especies"),
  ];

  return (
    <div className="h-full flex flex-col md:flex-row md:p-16 gap-8 md:gap-16 p-4">
      {links.map((link) => (
        <div className="shadow-md grid content-center p-4 md:basis-1/2 rounded-md bg-white hover:shadow-lg">
          <Link href={link.ulr} className="w-full h-full">
            <p className="text-center text-2xl">{link.label}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
