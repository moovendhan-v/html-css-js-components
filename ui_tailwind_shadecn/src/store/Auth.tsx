import {ComponentData} from '@/types/ComponentData.type'
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/api'; // Import the axios instance
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
          console.log('Token:', token);
          set({ isLoading: true, error: null });

          // Set the Authorization header directly before making the request
          api.defaults.headers['Authorization'] = `Bearer ${token}`;

          const response = await api.get('/profile/getprofileinfoprotect');
          console.log('Response:', response);
          const { user, components } = response.data.response;
          console.log(user)
          console.log(components)

          if (user) {
            const processedComponents: ComponentData[] | null = components
              ? components.map((component: ComponentDatas) => component.component_details.post_details)
              : null;

            set({
              user,
              isLoading: false,
              isLoggedIn: true,
              error: null,
              authToken: token,
              components: processedComponents,
            });
          } else {
            set({ error: 'User data not found', isLoading: false });
          }
        } catch (error: unknown) {
          console.error('Error:', error);
          set({ 
            error: error instanceof Error ? error.message : 'An unknown error occurred', 
            isLoading: false 
          });
        }
      },
      logout: () => {
        set({ user: null, isLoggedIn: false, authToken: null, components: null });
      },
    }),
    {
      name: 'auth-store',
      getStorage: () => localStorage,
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        isLoading: state.isLoading,
        error: state.error,
        authToken: state.authToken,
        components: state.components,
      }),
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

