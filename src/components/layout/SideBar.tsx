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
import { useToolStore } from "@/src/hooks/toolStore";
import type { ToolId } from "@/src/hooks/toolStore";

const sideBarIcons: Partial<Record<ToolId, JSX.Element>> = {
  dashboard: <BarChartIcon className="text-slate-200" />,
  disponibilidades: <WarehouseIcon className="text-slate-200" />,
  mantenimientos: <SummarizeIcon className="text-slate-200" />,
  solicitudes: <SummarizeIcon className="text-slate-200" />,
};

export default function SideBar() {
  const { cambiarVisivilidad, estaVisible } = useSideBarStore();
  const router = useRouter();
  const { tools } = useToolStore();
  // console.log(router.pathname);
  return (
    <div
      className={`transition ease-in-out duration-300 s text-slate-700 ${
        estaVisible ? "" : "hidden"
      }`}
    >
      <List className="bg-marn-dark">
        <Link href={"/"}>
          <ListItem
            disablePadding
            className={`text-slate-300 ${
              router.pathname === "/" ? "bg-marn-dark" : ""
            }`}
          >
            <ListItemButton onClick={() => cambiarVisivilidad()}>
              <ListItemIcon>
                <HomeIcon className="text-slate-200" />
              </ListItemIcon>

              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </Link>
        {tools.map(
          (tool, i) =>
            !tool.enConstruccion && (
              <Link
                key={`listLink-${i}`}
                href={tool.enConstruccion ? "/" : `/${tool.id}`}
              >
                <ListItem
                  key={`listItem-${i}`}
                  disablePadding
                  className={`text-slate-300 ${
                    router.pathname === tool.id ? "bg-marn-dark" : ""
                  }`}
                >
                  <ListItemButton
                    key={`listItemButton-${i}`}
                    onClick={() => cambiarVisivilidad()}
                  >
                    <ListItemIcon key={`listItemIcon-${i}`}>
                      {sideBarIcons[tool.id]}
                    </ListItemIcon>

                    <ListItemText
                      key={`listItemText-${i}`}
                      primary={tool.titulo}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            )
        )}
      </List>
    </div>
  );
}
