import Link from "next/link";
import { useRouter } from "next/router";

export default function Disponibilidades() {
  const router = useRouter();
  return (
    <div className="h-full flex flex-col">
      <Link href={`${router.pathname}/viveros`}>
        <div className="shadow-md p-4 basis-1/2 rounded-lg">Viveros</div>
      </Link>
      <Link href={`${router.pathname}/especies`}>
        <div className="shadow-md p-4 rounded-lg">Especies</div>
      </Link>
    </div>
  );
}
