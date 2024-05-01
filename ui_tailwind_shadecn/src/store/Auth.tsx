// import { LoginStore, LoginUserInfoStore } from '@/types/LoginStore.type';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

// #TODO authaticate users using a jwt

interface LoginStore {
   isLogin: boolean;
   toggleLogin: () => void;
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

 export const useLoginStore = create<LoginStore>()(
   persist(
     (set) => ({
       isLogin: false,
       toggleLogin: () => set((state) => ({ isLogin: !state.isLogin })),
     }),
     {
       name: 'login-store',
       getStorage: () => createCookieStorage({ path: '/', expires: 365 }),
       partialize: (state) => ({ isLogin: state.isLogin }),
     }
   )
 );


export const useLoginUserInfo = create<LoginUserInfoStore>(() => (
   {
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
      __v: 0
   }
))