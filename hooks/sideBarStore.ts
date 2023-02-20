import { create } from "zustand";

interface SideBarState {
  estaVisible: boolean;
  cambiarVisivilidad: () => void;
}

export const useSideBarStore = create<SideBarState>()((set) => ({
  estaVisible: false,
  cambiarVisivilidad: () =>
    set((state) => ({ estaVisible: !state.estaVisible })),
}));
