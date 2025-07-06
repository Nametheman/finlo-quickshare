import { create } from "zustand";

interface ServerActionsStore {
  refreshKey: number;
  triggerRefresh: () => void;
}

export const useServerActions = create<ServerActionsStore>((set) => ({
  refreshKey: 0,
  triggerRefresh: () => set((state) => ({ refreshKey: state.refreshKey + 1 })),
}));
