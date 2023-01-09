
export interface Post {
    audience: string,
        commented_users_list: number[],
        created_at: string,
        created_by: {},
        id: number,
        liked_users_list: any[],
        media: [],
        text: string,
        total_comments: number,
        total_likes: number
}

export interface Comment {
  created_at: string;
  created_by: { [key: string]: any };
  id: number;
  liked_users_list: [];
  replies: any[];
  text: string;
  total_likes: number;
}

