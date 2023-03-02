import MenuIcon from "@mui/icons-material/Menu";
import { Fab } from "@mui/material";
import { Poppins } from "@next/font/google";
import NavbarOptions from "./NavbarOptions";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { useSideBarStore } from "@/hooks/sideBarStore";
import Link from "next/link";

import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

export default function Navbar() {
  const [navbarOptions, setNavbarOptions] = useState(false);
  const sideBar = useSideBarStore();
  return (
    <nav className="bg-white w-screen h-16 border-b flex items-center justify-between py-2 px-3 z-30 absolute">
      <div className="flex items-center">
        <Fab
          size="medium"
          className="shadow-none"
          onClick={() => sideBar.cambiarVisivilidad()}
        >
          <MenuIcon className="text-slate-600" />
        </Fab>
        <Link href={"/"}>
          <h1 className="ml-2 text-slate-700 text-xl mr-4">Viveros</h1>
        </Link>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/">
            MUI
          </Link>
          <Link
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            Core
          </Link>
          <Typography color="text.primary">Breadcrumbs</Typography>
        </Breadcrumbs>
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
