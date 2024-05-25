import {ComponentData} from '@/types/ComponentData.type'
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// import { ProfileDetails } from '@/types/ComponentStore.type'

interface LoginStore {
  user: LoginUserInfoStore | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  error: string | null;
  // profileDetails: ProfileDetails;
  components: ComponentData[] | null;
  authToken: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

interface LoginUserInfoStore {
  _id: string;
  id: string | null;
  login: string | null;
  avatar_url: string | null;
  url: string | null;
  html_url: string | null;
  company: string | null;
  location: string | null;
  email: string | null;
  name: string | null;
  blog: string | null;
  bio: string | null;
  twitter_username: string | null;
}

export interface ComponentDetails {
  post_details: ComponentData;
}

export interface ComponentDatas {
  component_details: ComponentDetails;
}

export const useLoginStore = create<LoginStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      isLoading: false,
      error: null,
      authToken: null,
      components: null,
      login: async (token) => {
        try {
          set({ isLoading: true, error: null });
          console.log()
          const response = await fetch('http://localhost:4000/profile/getprofileinfoprotect', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }

          const data = await response.json();
          console.log(data);
          const { user, components } = data.response;

          if (user) {
            const processedComponents: ComponentData[] | null = components ? components.map((component: ComponentDatas) => {
              return component.component_details.post_details;
            }) : null;

            set({ user, isLoading: false, isLoggedIn: true, error: null, authToken:token, components: processedComponents });
            console.log(`Setting isLoggedIn to `);
          } else {
            set({ error: 'User data not found', isLoading: false });
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            set({ error: error.message, isLoading: false });
          } else {
            set({ error: 'An unknown error occurred', isLoading: false });
          }
        }
      },
      logout: () => {
        set({ user: null, isLoggedIn: false });
      },
    }),
    {
      name: 'auth-store',
      getStorage: () => localStorage,
      partialize: (state) => ({ user: state.user, isLoggedIn: state.isLoggedIn, isLoading: state.isLoading, error: state.error, authToken: state.authToken, components: state.components}),
    } 
  )
);

export const useLoginUserInfo = create<LoginUserInfoStore>(() => ({
  _id: "",
  id: null,
  login: null,
  avatar_url: null,
  url: null,
  html_url: null,
  company: null,
  location: null,
  email: null,
  name: null,
  blog: null,
  bio: null,
  twitter_username: null,
  __v: 0,
}));

