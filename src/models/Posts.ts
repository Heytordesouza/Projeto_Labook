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
        private creatorId: string,
        private creatorName: string
    ){}


    public getId(): string {
        return this.id
    }

    public setId(newId:string): void{
        this.id = newId
    }

    public getContent(): string {
        return this.content
    }

    public setContent(newContent:string): void{
        this.content = newContent
    }

    public getLikes(): number {
        return this.likes
    }

    public setLikes(newLikes:number): void{
        this.likes = newLikes
    }

    public addLike() {
        this.likes += 1
    }

    public removeLike() {
        this.likes -= 1
    }

    public addDislike() {
        this.dislikes += 1
    }

    public removeDislike() {
        this.dislikes -= 1
    }

    public getDislikes(): number {
        return this.dislikes
    }

    public setDislikes(value: number): void {
        this.dislikes = value
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

    public getCreatorId(): string {
        return this.creatorId
    }

    public setCreatorId(value: string): void {
        this.creatorId = value
    }

    public getCreatorName(): string {
        return this.creatorName
    }

    public setCreatorName(value: string): void {
        this.creatorName = value
    }

    public toPostDatabase (): PostDB {
        return{
            id:this.id,
            creator_id:this.creatorId,
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
                id:this.creatorId,
                name:this.creatorName
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