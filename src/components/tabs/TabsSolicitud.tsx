import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { DatosSolicitud } from "./TabSolicitud";
import SolicitudForm from "../form/SolicitudForm";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`solicitud-tabpanel-${index}`}
      aria-labelledby={`solicitud-tab-${index}`}
      {...other}
      className="h-full overflow-y-scroll p-4 rounded-md bg-white"
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `solicitud-tab-${index}`,
    "aria-controls": `solicitud-tabpanel-${index}`,
    className: "normal-case text-sm rounded-t-xl text-white bg-marn-darklight",
  };
}

export default function TabsSolicitud() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        textColor="inherit"
        TabIndicatorProps={{ className: "text-pink-100 bg-marn-dark" }}
        selectionFollowsFocus
        className="bg-transparents"
      >
        <Tab label="Datos" {...a11yProps(0)} />
        <Tab label="Asignaciones" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <DatosSolicitud />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SolicitudForm />
      </TabPanel>
    </>
  );
}
