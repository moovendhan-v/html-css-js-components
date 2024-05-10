// components data that we are getting. for components

export interface Comment {
  avatar: string;
  user: string;
  comment: string;
  date: string;
}


export interface ComponentData {
      html: string;
      css: string;
      js: string;
      categories: string;
      folder_path: string;
      folder_name: string;
      isActive: boolean;
      type: string;
      like: {
          isLiked: boolean;
          likeCount: number;
      };
      saved: {
          isSaved: boolean;
          savedCount: number;
      };
      views: {
          count: number;
      };
      title: string;
      description: string;
      comments: {
          count: number;
          commentsList: [Comment];
      };
      admin: {
          _id: string;
          login: string;
          avatar_url: string;
          url: string;
          html_url: string;
          company: string;
          location: string;
          name: string;
          blog: string;
          bio: string;
          twitter_username: string | null;
      };
}
