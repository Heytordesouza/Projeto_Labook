import { BaseDatabase } from "./BaseDatabase"
import { Posts } from "../models/Posts"
import { PostDB } from "../types"

export class PostDatabase extends BaseDatabase {
    static TABLE_POSTS = "posts"

    private async checkPost(id: string | undefined): Promise <void> {
    
        if (id) {
            const [PostsDB]: PostDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .where({ id: id })
    
            if (PostsDB) {
            throw new Error("'id' já cadastrado.")
            }
        }
    }

    public async findProductById(id: string) {
        const [ postDB ]: PostDB[] | undefined[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .where({ id })

        return postDB
    }

    async insertPost(parameter: Posts): Promise <void> {
        await this.checkPost(
            parameter.getId() as string,
        )

        await BaseDatabase.connection(PostDatabase.TABLE_POSTS).insert(parameter)
    }

    async findPost(): Promise <PostDB[]> {
    
        const postsDB: PostDB[] = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
    
        return postsDB
    }

    public async updatePost(updatedPostDB: PostDB) {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .update(updatedPostDB)
            .where({ id: updatedPostDB.id })
    }

    public async deletePostById(id: string) {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .delete()
            .where({ id })
    }
}