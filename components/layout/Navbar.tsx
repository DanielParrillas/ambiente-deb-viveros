import MenuIcon from "@mui/icons-material/Menu";
import { Fab } from "@mui/material";
import NavbarOptions from "./NavbarOptions";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { useSideBarStore } from "@/hooks/sideBarStore";
import Link from "next/link";

import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import { useRouter } from "next/router";

export default function Navbar() {
  const [navbarOptions, setNavbarOptions] = useState(false);
  const sideBar = useSideBarStore();
  const router = useRouter();

  const listBreadcrumbs = (): JSX.Element[] => {
    const namesSplit = router.pathname.split("/");
    let links: JSX.Element[] = [];
    let acumuladorLink: string = "";
    console.log(router.pathname);
    if (router.pathname === "/404") {
      links.push(
        <Link key={"404toHome"} href={"/"} className="text-slate-400">
          Home
        </Link>
      );
      return links;
    }
    if (router.pathname === "/") {
      console.log("is home");
      links.push(
        <Typography key="typography-home-not-url" className="text-slate-400">
          Home
        </Typography>
      );
      return links;
    } else {
      namesSplit.slice(1, namesSplit.length - 1).forEach((name, i) => {
        acumuladorLink += "/" + name;
        console.log(acumuladorLink);
        links.push(
          <Link
            key={acumuladorLink + i}
            href={acumuladorLink}
            className="text-slate-400"
          >
            {name}
          </Link>
        );
      });
      console.log("query");

      console.log(router.query);
      if (JSON.stringify(router.query) === "{}") {
        links.push(
          <Typography key={"lastlink"} className="text-slate-300">
            {namesSplit.pop()}
          </Typography>
        );
      }
    }
    return links;
  };

  return (
    <nav className="bg-marn-dark w-screen h-16 flex items-center justify-between py-2 px-3 z-30 absolute">
      <div className="flex items-center">
        <Fab
          size="medium"
          className="shadow-none text-white hover:bg-marn-dark hover:text-marn-dark active:text-marn-dark"
          onClick={() => sideBar.cambiarVisivilidad()}
        >
          <MenuIcon className="text-white" />
        </Fab>
        <Link href={"/"}>
          <h1 className="ml-2 text-white text-xl mr-4 md:mr-8">Viveros</h1>
        </Link>
        <Breadcrumbs aria-label="breadcrumb">{listBreadcrumbs()}</Breadcrumbs>
      </div>
      <div>
        <Avatar
          src="/profile.png"
          className=" hover:cursor-pointer hover:shadow-inner"
          onClick={() => setNavbarOptions(!navbarOptions)}
        />
      </div>
      {navbarOptions === true && <NavbarOptions />}
    </nav>
  );
}
