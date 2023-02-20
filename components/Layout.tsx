import { useSideBarStore } from "@/hooks/sideBarStore";
import { useState } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import Slide from "@mui/material/Slide";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const sideBar = useSideBarStore();
  return (
    <>
      <Navbar />
      {sideBar.estaVisible === true && <SideBar />}
      {/* <Slide in={sideBar.estaVisible} mountOnEnter unmountOnExit>
        <SideBar />
      </Slide> */}

      <main className="text-slate-600 p-6">{children}</main>
    </>
  );
}
