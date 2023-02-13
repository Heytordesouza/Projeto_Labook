import { BadRequestError } from "../errors/BadRequestError"
import { Posts } from "../models/Posts"


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

export interface CreatePostInputDTO {
    content: string,
}

export interface CreatePostOutputDTO {
    message: string,
    post: PostsOutputDTO
}

export interface EditPostInputDTO {
    idToEdit: string,
    newContent: string,
}

export interface EditPostOutputDTO {
    message: string,
    post: PostsOutputDTO
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

    public createPostOutput = (post: Posts): CreatePostOutputDTO => {
        const dto: CreatePostOutputDTO = {
            message: "Post registrado com sucesso",
            post: post.toPostOutput()
        }
        return dto
    }

    public editProductInput(
        idToEdit: string,
        newContent: unknown
    ){
        if (typeof idToEdit !== "string") {
            throw new BadRequestError("'Id' deve ser string")
        }

        if (typeof newContent !== "string") {
            throw new BadRequestError("'Content' deve ser string")
        }

        const dto: EditPostInputDTO ={
            idToEdit,
            newContent
        }

        return dto
    }

    public editPostOutput(post: Posts): EditPostOutputDTO{
        const dto: EditPostOutputDTO = {
            message: "Post editado com sucesso",
            post: post.toPostOutput()
        }
        return dto
    }
}