import { BaseDatabase } from "./BaseDatabase"
import { Posts } from "../models/Posts"
import { PostDB, PostEditDB } from "../types"

export class PostDatabase extends BaseDatabase {
    static TABLE_POSTS = "posts"

    public getAllPosts = async ():Promise<PostDB[]> =>{
        
        return await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)

    }

    public getPostByUserId = async (userId:string) :Promise<PostDB[]>=> {

        return await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .where({creator_id:userId})
        
    }

    public findPostById = async (id: string): Promise<PostDB | undefined> => {
        const [ postDB ]: PostDB[] | undefined[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .where({ id })

        return postDB
    }

    public insertPost = async (newPostDB: PostDB): Promise <void> => {
        await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .insert(newPostDB)
    }

    public findPost = async (parameter: string | undefined): Promise <PostDB[]> => {
        let result
    
        if (parameter) {
          const postsDB: PostDB[] = await BaseDatabase
          .connection(PostDatabase.TABLE_POSTS)
          .where("id", "LIKE", `%${parameter}%`)
    
          result = postsDB
    
        } else {
          const postsDB: PostDB[] = await BaseDatabase
          .connection(PostDatabase.TABLE_POSTS)
          result = postsDB
        }
    
        return result
    }

    public updatePost = async (id:string, toEdit:PostEditDB) => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .update(toEdit)
            .where({id})
    }

    public deletePostById = async (id: string) :Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .delete()
            .where({ id })
    }
}