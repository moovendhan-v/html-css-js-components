// components data that we are getting. for components
export interface ComponentData {
    html: string;
    css: string;
    js: string;
    catogries: string;
    folder_path: string;
    folder_name: string;
    isActive: boolean;
    type: string;
    like: {
      isLiked: boolean | false;
      likeCount:string | "0";
    };
    saved:{
      isSaved: boolean | false;
      savedCount: string | "0";
    };
    title: string;
    description: string;
    comments:{
      count: string,
      commentsList:[
        {
          comment:string,
          user:string,
          avatar:string,
          date:string
        }
      ]
    };
    admin: {
      _id: string;
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
    };
  }
