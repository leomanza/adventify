import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
    email: string;
}

interface State {
  user?: User;
  setUser: (user: User) => void
}

export const UserStore = create<State>()(
  persist(
    (set, get) => ({
      user: undefined,
      setUser: (user: User) => set({ user }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
