// components data that we are getting. for components

import { User } from "./User.types";

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
      admin: User,
      isAdmin: boolean;
}
