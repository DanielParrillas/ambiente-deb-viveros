import { create } from "zustand";
import { AlertProps } from "@mui/material";

interface AlertState {
  estaVisible: boolean;
  props?: AlertProps;
  titulo?: string;
  mensaje: string;
  lanzarAlerta: (mensaje: string, props?: AlertProps) => void;
  cerrarAlerta: () => void;
}

export const useAlert = create<AlertState>()((set) => ({
  estaVisible: false,
  mensaje: "",
  lanzarAlerta: (mensaje, props?) =>
    set((state) => ({ props: props, estaVisible: true, mensaje: mensaje })),
  cerrarAlerta: () => set((state) => ({ estaVisible: false })),
}));
