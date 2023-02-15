import { PostDatabase } from "../database/PostDatabase"
import { UserDatabase } from "../database/UserDatabase"
import { CreatePostInput, CreatePostOutputDTO, GetPostsInput, PostDTO, PostsOutputDTO } from "../dtos/PostDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { Posts } from "../models/Posts"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/idGenerator"
import { TokenManager } from "../services/TokenManager"
import { PostDB, PostEditDB } from "../types"

export class PostBusiness {
    constructor(
        private postDTO: PostDTO,
        private postDatabase: PostDatabase,
        private userDatabase: UserDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator
      ){}

    public getPost = async (input: GetPostsInput) => {
        const { q, token } = input

        if (typeof q !== "string" && q !== undefined) {
            throw new BadRequestError("'q' deve ser string")
        }

        if (typeof token !== "string") {
            throw new BadRequestError("'token' está vazio")
        }

        const payload = this.tokenManager.getPayload(token)
        if(payload === null){
            throw new BadRequestError("'token' não é valido")
        }

        const postsDB = await this.postDatabase.findPost(q)
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

    public createPost = async (input: CreatePostInput): Promise<CreatePostOutputDTO> => {
        const {token, content} = input

        if (typeof token !== "string") {
            throw new BadRequestError("'token' está vazio")
        }

        const payload = this.tokenManager.getPayload(token)
        if(payload === null){
            throw new BadRequestError("'token' não é valido")
        }

        const id = this.idGenerator.generate()
        
        const user = {
            id: payload.id,
            name: payload.name
        }

        const postInstance = new Posts(
        id,
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
            token,
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

        const payload = this.tokenManager.getPayload(token)
        if(payload === null){
            throw new BadRequestError("'token' não é valido")
        }

        if(payload.id !== user.id){
            throw new BadRequestError("Somente o criador da postagem pode editar")
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
        const { idToDelete, token } = input

        const postToDeleteDB = await this.postDatabase.findPostById(idToDelete)

        if (!postToDeleteDB) {
            throw new NotFoundError("'id' para deletar não existe")
        }

        const user = await this.userDatabase.findUserById(postToDeleteDB.creator_id)
        if (!user) {
            throw new NotFoundError("Erro ao procurar Id do criador do post")
        }

        const payload = this.tokenManager.getPayload(token)
        if(payload === null){
            throw new BadRequestError("'token' não é valido")
        }

        if(payload.id !== user.id){
            throw new BadRequestError("Somente o criador da postagem pode excluir")
        }

        await this.postDatabase.deletePostById(postToDeleteDB.id)

        
        const output = {
            message: "Post deletado com sucesso"
        }

        return output
    }
}