import { USER_ROLES } from "./services/TokenManager"

export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string
};

export interface PostDB  {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string
};

export interface PostWithCreatorDB extends PostDB {
    creator_name: string
};

export interface Likes_dislikesDB  {
    user_id: string,
    post_id: string,
    like: number
}

export enum POST_LIKE {
    ALREADY_LIKED = "ALREADY LIKED",
    ALREADY_DISLIKED = "ALREADY DISLIKED"
}

export interface UserDBCreated {
    name: string,
    email: string,
    password: string,
    created_at: string
}

export interface UserOutput{ 
    id:string,
    name:string,
    email:string,
    password: string,
    role:USER_ROLES,
    created_at:string,
}

export interface PostEditDB{
    content?:string,
    likes?:number,
    dislikes?:number,
    updated_at?:string
}

export interface LikeDislikeDB{
    user_id: string,
    post_id: string,
    like: number
}
