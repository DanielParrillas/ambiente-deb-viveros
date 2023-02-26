import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import DescriptionIcon from "@mui/icons-material/Description";
import Link from "next/link";
import { useSideBarStore } from "@/hooks/sideBarStore";

export default function SideBar() {
  const sideBar = useSideBarStore();
  return (
    <div className=" h-full absolute left-0 top-0 pt-16 w-96  text-slate-700 z-20">
      <List className="bg-white shadow-2xl h-full w-full py-6">
        <ListItem disablePadding>
          <ListItemButton onClick={() => sideBar.cambiarVisivilidad()}>
            <ListItemIcon>
              <StorageIcon />
            </ListItemIcon>
            <Link href="/disponibilidad">
              <ListItemText primary="Disponibilidad" />
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => sideBar.cambiarVisivilidad()}>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Solicitudes" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
}
