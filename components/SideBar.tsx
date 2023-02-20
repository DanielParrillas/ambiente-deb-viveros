import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import DescriptionIcon from "@mui/icons-material/Description";

export default function SideBar() {
  return (
    <div className=" h-full absolute left-0 top-0 pt-16 w-96  text-slate-700 z-10">
      <List className="bg-white shadow-2xl h-full w-full py-6">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <StorageIcon />
            </ListItemIcon>
            <ListItemText primary="Disponibilidad" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
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
