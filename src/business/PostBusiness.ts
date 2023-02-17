import { PostDatabase } from "../database/PostDatabase"
import { UserDatabase } from "../database/UserDatabase"
import { CreatePostInput, DeletePostInputDTO, EditPostInputDTO, GetPostsInput, LikeOrDislikePostInputDTO, PostDTO } from "../dtos/PostDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { Posts } from "../models/Posts"
import { IdGenerator } from "../services/idGenerator"
import { TokenManager, USER_ROLES } from "../services/TokenManager"
import { LikeDislikeDB, PostEditDB, POST_LIKE, PostWithCreatorDB } from "../types"

export class PostBusiness {
    constructor(
        private postDTO: PostDTO,
        private postDatabase: PostDatabase,
        private userDatabase: UserDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator
      ){}

    public getPost = async (input: GetPostsInput) => {
        const { token } = input

        if (typeof token !== "string") {
            throw new BadRequestError("'token' está vazio")
        }

        const payload = this.tokenManager.getPayload(token)

        if(payload === null){
            throw new BadRequestError("'token' não é valido")
        }

        const postWithCreatorsDB: PostWithCreatorDB[] = 
          await this.postDatabase.getPostWithCreator()

        const posts = postWithCreatorsDB.map((PostWithCreatorDB) => {
            const post = new Posts(
                PostWithCreatorDB.id,
                PostWithCreatorDB.content,
                PostWithCreatorDB.likes,
                PostWithCreatorDB.dislikes,
                PostWithCreatorDB.created_at,
                PostWithCreatorDB.updated_at,
                PostWithCreatorDB.creator_id,
                PostWithCreatorDB.creator_name
            )
            return post
        })
        const output = this.postDTO.GetPostOutputDTO(posts)

        return output
    }

    public createPost = async (input: CreatePostInput): Promise<void> => {
        const {token, content} = input

        if (typeof token !== "string") {
            throw new BadRequestError("'token' está vazio")
        }

        const payload = this.tokenManager.getPayload(token)

        if(payload === null){
            throw new BadRequestError("'token' não é valido")
        }

        const id = this.idGenerator.generate()
        
        const creatorId = payload.id
        const creatorName = payload.name

        const postInstance = new Posts(
        id,
        content,
        0,
        0,
        new Date().toISOString(),
        new Date().toISOString(),
        creatorId,
        creatorName
        )

        const postDB = postInstance.toPostDatabase()

        await this.postDatabase.insertPost(postDB)
    }

    public editPost = async (input: EditPostInputDTO): Promise<void> => {
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

        const creatorId = payload.id

        if(postToEditDB.creator_id !== creatorId){
            throw new BadRequestError("Somente o criador da postagem pode editar")
        }

        const creatorName = payload.name

        const postEdit = new Posts(
            postToEditDB.id,
            postToEditDB.content,
            postToEditDB.likes,
            postToEditDB.dislikes,
            postToEditDB.created_at,
            postToEditDB.updated_at,
            creatorId,
            creatorName
        )

        postEdit.setContent(newContent)
        postEdit.setUpdated_at(new Date().toISOString())
        
        const toEdit: PostEditDB = {
            content: postEdit.getContent(),
            updated_at: postEdit.getUpdated_at()
        }

        await this.postDatabase.updatePost(postEdit.getId(), toEdit)
    }


    public deletePost = async (input: DeletePostInputDTO): Promise<void> => {
        const { idToDelete, token } = input

        const postToDeleteDB = await this.postDatabase.findPostById(idToDelete)

        if (!postToDeleteDB) {
            throw new NotFoundError("'id' para deletar não existe")
        }

        const payload = this.tokenManager.getPayload(token)

        if(payload === null){
            throw new BadRequestError("'token' não é valido")
        }

        const creatorId = payload.id

        if (
            payload.role !== USER_ROLES.ADMIN
            && postToDeleteDB.creator_id !== creatorId
        ) {
            throw new BadRequestError("Somente ADMIN ou quem criou o post pode deletá-la")
        }

        await this.postDatabase.deletePostById(postToDeleteDB.id)
    }

    public LikeOrDislikePost = async (input: LikeOrDislikePostInputDTO): Promise<void> => {
        const { idToLikeOrDislike, token, like } = input

        if (token === undefined) {
            throw new NotFoundError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if(payload === null){
            throw new BadRequestError("'token' não é valido")
        }

        if (typeof like !== "boolean"){
            throw new BadRequestError("'like' deve ser boolean")
        }

        const PostWithCreatorDB = await this.postDatabase.findPostWithCreatorById(idToLikeOrDislike)

        if (!PostWithCreatorDB){
            throw new NotFoundError("'id' não encontrada")
        }

        const userId= payload.id
        const likesDatabase = like ? 1 : 0

        const likeDislikeDB : LikeDislikeDB = {
            user_id: userId,
            post_id: PostWithCreatorDB.id,
            like: likesDatabase
        }

        const posts = new Posts(
            PostWithCreatorDB.id,
            PostWithCreatorDB.content,
            PostWithCreatorDB.likes,
            PostWithCreatorDB.dislikes,
            PostWithCreatorDB.created_at,
            PostWithCreatorDB.updated_at,
            PostWithCreatorDB.creator_id,
            PostWithCreatorDB.creator_name
        )

        const likeDislikeExists = await this.postDatabase
            .findLikeDislike(likeDislikeDB)

        if (likeDislikeExists === POST_LIKE.ALREADY_LIKED) {
            if (like) {
                await this.postDatabase.removeLikeDislike(likeDislikeDB)
                posts.removeLike()
            } else {
                await this.postDatabase.updateLikeDislike(likeDislikeDB)
                posts.removeLike()
                posts.addDislike()
            }

        } else if (likeDislikeExists === POST_LIKE.ALREADY_DISLIKED) {
            if (like) {
                await this.postDatabase.updateLikeDislike(likeDislikeDB)
                posts.removeDislike()
                posts.addLike()
            } else {
                await this.postDatabase.removeLikeDislike(likeDislikeDB)
                posts.removeDislike()
            }

        } else {
            await this.postDatabase.likeOrDislikePost(likeDislikeDB)
    
            like ? posts.addLike() : posts.addDislike()
        }

        const updatedPostDB = posts.toPostDatabase()
    
        await this.postDatabase.updatePost(idToLikeOrDislike, updatedPostDB)
    }
}