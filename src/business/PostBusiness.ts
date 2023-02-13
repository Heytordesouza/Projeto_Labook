import { PostDatabase } from "../database/PostDatabase"
import { UserDatabase } from "../database/UserDatabase"
import { CreatePostOutputDTO, PostDTO } from "../dtos/PostDTO"
import { NotFoundError } from "../errors/NotFoundError"
import { Posts } from "../models/Posts"
import { PostDB, PostEditDB } from "../types"

export class PostBusiness {
    constructor(
        private postDTO: PostDTO,
        private postDatabase: PostDatabase,
        private userDatabase: UserDatabase,
      ){}

    public getPost = async (input: any) => {

        let postsDB

        if (!input) {
            const posts: PostDB[] = await this.postDatabase.getAllPosts()
            postsDB = posts
        } else {
            const posts: PostDB[] = await this.postDatabase.getPostByUserId(input)
            postsDB = posts
        }
        const users = await this.userDatabase.getAllUsers()

        const posts = postsDB.map((postDB) => {
            const userFind = users.find((user) => user.id === postDB.creator_id)
            if (!userFind) {
                throw new Error("Usuario não encontrado");
            }
            const user = {
                id: userFind.id,
                name: userFind.name
            }
        
            const post = new Posts(
                postDB.id,
                postDB.content,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                postDB.updated_at,
                user
            )
            return post
        })
        const output = this.postDTO.GetPostOutputDTO(posts)

        return output
    }

    public createPost = async (content: string, user: { id: string, name: string }): Promise<CreatePostOutputDTO> => {

        const postInstance = new Posts(
        Math.floor(Date.now() * Math.random()).toString(3),
        content,
        0,
        0,
        new Date().toISOString(),
        new Date().toISOString(),
        user
        )

        const postDB = postInstance.toPostDatabase()

        await this.postDatabase.insertPost(postDB)

        const output = this.postDTO.createPostOutput(postInstance)

        return(output)
    }



    public editPost = async (input: any) => {
        const {
            idToEdit,
            newContent
        } = input

        const postToEditDB = await this.postDatabase.findPostById(idToEdit)

        if (!postToEditDB) {
            throw new NotFoundError("'id' para editar não existe")
        }

        const user = await this.userDatabase.findUserById(postToEditDB.creator_id)
        if (!user) {
            throw new NotFoundError("Erro ao procurar Id do criador do post")
        }

        const postEdit = new Posts(
           postToEditDB.id,
           postToEditDB.content,
           postToEditDB.likes,
           postToEditDB.dislikes,
           postToEditDB.created_at,
           postToEditDB.updated_at,
           user
        )

        // newId && post.setId(newId)
        postEdit.setContent(newContent)
        postEdit.setUpdated_at(new Date().toISOString())
        
        const toEdit: PostEditDB = {
            content: postEdit.getContent(),
            updated_at: postEdit.getUpdated_at()
        }

        await this.postDatabase.updatePost(postEdit.getId(), toEdit)

        const output = this.postDTO.editPostOutput(postEdit)

        return output
    }


    public deletePost = async (input: any) => {
        const { idToDelete } = input

        const postToDeleteDB = await this.postDatabase.findPostById(idToDelete)

        if (!postToDeleteDB) {
            throw new NotFoundError("'id' para deletar não existe")
        }

        await this.postDatabase.deletePostById(postToDeleteDB.id)

        const output = {
            message: "Post deletado com sucesso"
        }

        return output
    }
}