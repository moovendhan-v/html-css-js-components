export type LoginStore = {
   isLogin: boolean;
};

export type LoginUserInfoStore = {
    _id: string;
   id: number | null;
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
   __v: number;
}