export interface User {
    _id: string;
    login: string;
    avatar_url: string;
    url: string;
    html_url: string;
    company: string | null;
    location: string | null;
    email: string | null;
    name: string;
    blog: string | null;
    bio: string | null;
    twitter_username: string | null;
  }