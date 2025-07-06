import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, PersistStorage, StorageValue } from "zustand/middleware";

interface IAuthStore {
  isLoggedIn: boolean;
  token: string | null;
  user: any;
  setToken: (token: string | null) => void;
  setUser: (user: any) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
  clearStorage: () => void;
}
const asyncStorage: PersistStorage<IAuthStore> = {
  getItem: async (name): Promise<StorageValue<IAuthStore> | null> => {
    const value = await AsyncStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (name, value) => {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name) => {
    await AsyncStorage.removeItem(name);
  },
};

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      token: null,
      user: null,
      setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      clearStorage: () => set({ isLoggedIn: false, token: null, user: null }),
      hydrated: false,
    }),
    {
      name: "auth-storage",
      storage: asyncStorage,
    }
  )
);
