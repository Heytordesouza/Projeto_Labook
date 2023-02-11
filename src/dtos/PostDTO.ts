import { BadRequestError } from "../errors/BadRequestError"
import { Posts } from "../models/Posts"

export interface CreatePostInputDTO {
    content: string,
}

export interface CreatePostOutputDTO {
    message: string,
    post: {
        id: string,
        creator_id: string,
        content: string,
        likes: number,
        dislikes: number,
        created_at: string,
        updated_at: string
    }
}

export interface EditPostInputDTO {
    idToEdit: string,
    newContent: string,
}

export interface EditPostOutputDTO {
    message: string,
    post: {
        id: string,
        creator_id: string,
        content: string,
        likes: number,
        dislikes: number,
        created_at: string,
        updated_at: string
    }
}




export class PostDTO {
    
    public createPostInput(
        content: unknown,
    ): CreatePostInputDTO{
        if (typeof content !== "string") {
            throw new BadRequestError("'id' deve ser string")
        }
          
        const dto: CreatePostInputDTO = {
        content
        }

        return dto
    }

    public createPostOutput(post: Posts): CreatePostOutputDTO{
        const dto: CreatePostOutputDTO = {
            message: "Post registrado com sucesso",
            post: {
                id: post.getId(),
                creator_id: post.getCreator_id(),
                content: post.getContent(),
                likes: post.getLikes(),
                dislikes: post.getDislikes(),
                created_at: post.getCreated_at(),
                updated_at: post.getUpdated_at()
            }
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
            post: {
                id: post.getId(),
                creator_id: post.getCreator_id(),
                content: post.getContent(),
                likes: post.getLikes(),
                dislikes: post.getDislikes(),
                created_at: post.getCreated_at(),
                updated_at: post.getUpdated_at()
            }
        }
        return dto
    }
}