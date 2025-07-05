// stores/useSidebarStore.ts
import { create } from 'zustand';

interface SidebarState {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

const useSidebarStore = create<SidebarState>(set => ({
  isOpen: false,
  toggle: () => set(state => ({ isOpen: !state.isOpen })),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useSidebarStore;
