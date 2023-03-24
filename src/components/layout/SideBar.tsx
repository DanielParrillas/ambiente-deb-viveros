import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import BarChartIcon from "@mui/icons-material/BarChart";
import HomeIcon from "@mui/icons-material/Home";
import SummarizeIcon from "@mui/icons-material/Summarize";

import Link from "next/link";
import { useSideBarStore } from "@/src/hooks/sideBarStore";
import { useRouter } from "next/router";

function createSideBarItem(name: string, url: string, icon: JSX.Element) {
  return { name, url, icon };
}
const sideBarItems = [
  createSideBarItem("Home", "/", <HomeIcon className="text-slate-200" />),
  createSideBarItem(
    "Dashboard",
    "/dashboard",
    <BarChartIcon className="text-slate-200" />
  ),
  createSideBarItem(
    "Disponibilidades",
    "/disponibilidades",
    <WarehouseIcon className="text-slate-200" />
  ),
  createSideBarItem(
    "Solicitudes",
    "/solicitudes",
    <SummarizeIcon className="text-slate-200" />
  ),
];

export default function SideBar() {
  const sideBar = useSideBarStore();
  const router = useRouter();
  // console.log(router.pathname);
  return (
    <div className=" h-full absolute left-0 top-0 pt-16 w-full sm:w-72  text-slate-700 z-20">
      <List className="bg-marn-dark shadow-2xl shadow-black h-full w-full py-6">
        {sideBarItems.map((item, i) => (
          <Link key={`listLink-${i}`} href={item.url}>
            <ListItem
              key={`listItem-${i}`}
              disablePadding
              className={`text-slate-300 ${
                router.pathname === item.url ? "bg-marn-dark" : ""
              }`}
            >
              <ListItemButton
                key={`listItemButton-${i}`}
                onClick={() => sideBar.cambiarVisivilidad()}
              >
                <ListItemIcon key={`listItemIcon-${i}`}>
                  {item.icon}
                </ListItemIcon>

                <ListItemText key={`listItemText-${i}`} primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
}
