export class Posts{
    constructor(
        private id:string,
        private creator_id:string,
        private content:string,
        private likes:number,
        private dislikes:number,
        private created_at:string,
        private updated_at:string
    ){}


    public getId(){
        return this.id
    }

    public setId(newId:string): void{
        this.id = newId
    }

    public getCreator_id(){
        return this.creator_id
    }

    public setCreator_id(newCreator_id:string): void{
        this.creator_id = newCreator_id
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