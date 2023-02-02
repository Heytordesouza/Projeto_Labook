enum Role {
    ADMIN = "ADMIN",
    NORMAL = "NORMAL"
};

type TUsers = {
    id: string,
    name: string,
    email: string,
    password: string,
    role: Role,
    created_at: string
};

type TPosts = {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string
};

type Tlikes_dislikes = {
    user_id: string,
    post_id: string,
    like: number
}

