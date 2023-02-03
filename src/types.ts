export enum Role {
    ADMIN = "ADMIN",
    NORMAL = "NORMAL"
};

export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
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

export interface Likes_dislikesDB  {
    user_id: string,
    post_id: string,
    like: number
}

export interface UserDBCreated {
    name: string,
    email: string,
    password: string,
    created_at: string
}
