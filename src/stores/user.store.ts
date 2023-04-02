import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
    email: string;
}

interface State {
  user?: User;
  setUser: (user: User) => void,
  isAuthenticated: boolean,
  removeAuthInfo: () => void
}

export const UserStore = create<State>()(
  persist(
    (set, get) => ({
      user: undefined,
      isAuthenticated: false,
      setUser: (_user: User) => set({ user: _user, isAuthenticated: true }),
      removeAuthInfo: () =>
       set({user: undefined, isAuthenticated: false})
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
