export class Likes_dislikes{
    constructor(
        private user_id:string,
        private post_id:string,
        private like:string,
    ){}


    public getUser_id(){
        return this.user_id
    }

    public setUser_id(newUser_id:string): void{
        this.user_id = newUser_id
    }

    public getPost_id(){
        return this.post_id
    }

    public setPost_id(newPost_id:string): void{
        this.post_id = newPost_id
    }

    public getLike(){
        return this.like
    }

    public setLike(newLike:string): void{
        this.like = newLike
    }
}