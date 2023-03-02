import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import ParkIcon from "@mui/icons-material/Park";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import { useSideBarStore } from "@/hooks/sideBarStore";

function createSideBarItem(name: string, url: string, icon: JSX.Element) {
  return { name, url, icon };
}
const sideBarItems = [
  createSideBarItem("Home", "/", <HomeIcon />),
  createSideBarItem("Viveros", "/viveros", <WarehouseIcon />),
  createSideBarItem("Especies", "/especies", <ParkIcon />),
];

export default function SideBar() {
  const sideBar = useSideBarStore();
  return (
    <div className=" h-full absolute left-0 top-0 pt-16 w-96  text-slate-700 z-20">
      <List className="bg-white shadow-2xl h-full w-full py-6">
        {sideBarItems.map((item, i) => (
          <Link key={`listLink-${i}`} href={item.url}>
            <ListItem key={`listItem-${i}`} disablePadding>
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