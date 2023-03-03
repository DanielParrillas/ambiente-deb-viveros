import { Alert } from "@mui/material";
import Example from "@/components/chart/firtChart";
import EspecieAutoComplete from "@/components/form/components/EspecieAutoComplete";

export default function Home() {
  return (
    <div>
      <Alert severity="success" color="info">
        This is a success alert — check it out!
      </Alert>
      <EspecieAutoComplete />
    </div>
  );
}
