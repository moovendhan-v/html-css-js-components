import create from 'zustand';
import { Models } from "appwrite";
import { logout } from "@/appwrite";
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  user: Models.Account<Models.Preferences> | null;
  setUser: (user: Models.Account<Models.Preferences> | null) => void;
  logout: () => void;
}

// export const useAuthStore = create<AuthState>((set) => ({
//   user: null,
//   setUser: (user) => set({ user }),
//   logout: async () => {
//     await logout();
//     set({ user: null }); // Update store state after logout
//   },
// }));

export const useAuthStore = create<AuthState>()(
    persist(
        (set)=>({
            user: null,
            setUser: (user) => set({ user }),
            logout: async () => {
                await logout();
                set({ user: null }); // Update store state after logout
              },
        }),
        {
            name: 'auth-store',
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({user: state.user})
        }
    )
)
