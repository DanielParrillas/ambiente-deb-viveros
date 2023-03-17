import { create } from "zustand";

interface SideBarState {
  estaVisible: boolean;
  cambiarVisivilidad: () => void;
  cerrarSideBar: () => void;
}

export const useSideBarStore = create<SideBarState>()((set) => ({
  estaVisible: false,
  cambiarVisivilidad: () =>
    set((state) => ({ estaVisible: !state.estaVisible })),
  cerrarSideBar: () => set((state) => ({ estaVisible: false })),
}));
