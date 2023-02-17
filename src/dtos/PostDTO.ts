import { BadRequestError } from "../errors/BadRequestError"
import { Posts } from "../models/Posts"

export interface GetPostsInput {
    token: string | undefined
}

export interface PostsOutputDTO{
    id:string,
    content:string,
    likes:number,
    dislikes:number,
    createdAt:string,
    updatedAt:string,
    creator:{
        id:string,
        name:string
    }
}

export interface CreatePostInput {
    token: string | undefined
    content: string
}

export interface EditPostInputDTO {
    idToEdit: string,
    token: string | undefined,
    newContent: string,
}

export interface DeletePostInputDTO {
    idToDelete: string,
    token: string | undefined
}

export interface LikeOrDislikePostInputDTO{
    idToLikeOrDislike: string,
    token: string | undefined,
    like: unknown
}

export class PostDTO {

    public GetPostOutputDTO = (posts:Posts[]): PostsOutputDTO[] =>{
        const dto:PostsOutputDTO[] = posts.map((post)=>post.toPostOutput())
        return dto
    }
    
    public createPostInput = (content: unknown): string => {
        if (typeof content!== "string") {
            throw new BadRequestError("'content' deve ser string")
        }
        return content
    }

    public editProductInput(
        idToEdit: string,
        token: string | undefined,
        newContent: unknown
    ){
        if (typeof idToEdit !== "string") {
            throw new BadRequestError("'id' deve ser string")
        }

        if (typeof token !== "string") {
            throw new BadRequestError("'token' deve ser string")
        }

        if (typeof newContent !== "string") {
            throw new BadRequestError("'content' deve ser string")
        }

        const dto: EditPostInputDTO ={
            idToEdit,
            token,
            newContent
        }
        return dto
    }
}