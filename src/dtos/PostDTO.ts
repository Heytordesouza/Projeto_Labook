import { BadRequestError } from "../errors/BadRequestError"
import { Posts } from "../models/Posts"

// export interface GetPostInputDTO {
//     id: string,
//     creator_id: string,
//     content: string,
//     likes: number,
//     dislikes: number,
//     created_at: string,
//     updated_at: string
// }

export interface GetPostOutputDTO {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string
}

export class PostDTO {
    
    // public getPostOutput(post: Posts){
    //     const dto: GetPostOutputDTO = {
    //         id: post.getId(),
    //         creator_id: post.getCreator_id(),
    //         content: post.getContent(),
    //         likes: post.getLikes(),
    //         dislikes: post.getDislikes(),
    //         created_at: post.getCreated_at(),
    //         updated_at: post.getUpdated_at()
    //     }

    //     return dto
    // }
}