// components data that we are getting. for components
export interface ComponentData {
    html: string;
    css: string;
    js: string;
    catogries: string;
    folder_path: string;
    folder_name: string;
    isActive: boolean;
    title: string;
    description: string;
    admin: {
      _id: string;
      id: number;
      login: string;
      avatar_url: string;
      url: string;
      html_url: string;
      company: string;
      location: string;
      email: string | null;
      name: string;
      blog: string;
      bio: string;
      twitter_username: string | null;
      __v: number;
    };
  }
