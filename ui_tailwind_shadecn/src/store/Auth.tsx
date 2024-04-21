import { LoginStore } from '@/types/LoginStore.type';
import { create } from 'zustand';

export const useLoginStore = create<LoginStore>(() => ({
   isLogin: false,
   user: {
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
}));
