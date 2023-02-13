import { PostsOutputDTO } from "../dtos/PostDTO"
import { PostDB } from "../types"

export class Posts{
    constructor(
        private id:string,
        private content:string,
        private likes:number,
        private dislikes:number,
        private created_at:string,
        private updated_at:string,
        private creator:{
            id:string,
            name:string
        }
    ){}


    public getId(){
        return this.id
    }

    public setId(newId:string): void{
        this.id = newId
    }

    public getContent(){
        return this.content
    }

    public setContent(newContent:string): void{
        this.content = newContent
    }

    public getLikes(){
        return this.likes
    }

    public setLikes(newLikes:number): void{
        this.likes = newLikes
    }

    public getDislikes(){
        return this.dislikes
    }

    public setDislikes(newDislikes:number): void{
        this.dislikes = newDislikes
    }

    public getCreated_at(){
        return this.created_at
    }

    public setCreated_at(newCreated_at:string): void{
        this.created_at = newCreated_at
    }

    public getUpdated_at(){
        return this.updated_at
    }

    public setUpdated_at(newUpdated_at:string): void{
        this.updated_at = newUpdated_at
    }

    public getCreator():{id:string,name:string}{
        return this.creator
    }

    public toPostDatabase (): PostDB {
        return{
            id:this.id,
            creator_id:this.creator.id,
            content:this.content,
            likes:this.likes,
            dislikes:this.dislikes,
            created_at:this.created_at,
            updated_at:this.updated_at
        }
    }
    public toPostOutput (): PostsOutputDTO{
        return{
            id:this.id,
            content:this.content,
            likes:this.likes,
            dislikes:this.dislikes,
            createdAt:this.created_at,
            updatedAt:this.updated_at,
            creator:{
                id:this.creator.id,
                name:this.creator.name
            }
        }
    }
}


export class PostContent{
    constructor(
        private content:string,
    ){}

    public getContent(){
        return this.content
    }

    public setContent(newContent:string): void{
        this.content = newContent
    }
}