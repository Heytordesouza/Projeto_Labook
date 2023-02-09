import { PostDatabase } from "../database/PostDatabase"
import { PostContent, Posts } from "../models/Posts"
import { PostDB } from "../types"

export class PostBusiness {
    public getPost = async () => {
        const postDatabase = new PostDatabase()
        const postsDB: PostDB[] = await postDatabase.findPost()

        const posts: Posts[] = postsDB.map((postDB) => 
            new Posts(
                postDB.id,
                postDB.creator_id,
                postDB.content,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                postDB.updated_at
            ))

        return posts
    }

    public createPost = async (input: any) => {

        const {content} = input

        const postDBInstance = new PostDatabase()


        if (content !== undefined) {
        if (typeof content !== "string") {
            throw new Error("'content' deve ser string")
        }
        }

        const lista = ['u001', 'u002', 'u003']
        const creator_id = lista[Math.floor(Math.random() * lista.length)]


        //Instanciando a classe User, porém passando os valores vindo das requisições e armazenando na variável userInstance.
        const postInstance = new Posts(
        Math.floor(Date.now() * Math.random()).toString(3),
        creator_id,
        content,
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        new Date().toISOString(),
        new Date().toISOString()
        )

        //Para demonstrar a criação do usuário, precisamos acessar os valores que estão na classe, porém para acessar os valores na classe só será possível através dos métodos.
        const newPostDB: PostDB = {
        id: postInstance.getId(),
        creator_id: postInstance.getCreator_id(),
        content: postInstance.getContent(),
        likes: postInstance.getLikes(),
        dislikes: postInstance.getDislikes(),
        created_at: postInstance.getCreated_at(),
        updated_at: postInstance.getUpdated_at()
        }

        await postDBInstance.insertPost(postInstance)

        const output = {
            token: "um token jwt"
        }

        return(output)
    }



    public editPost = async (input: any) => {
        const {
            idToEdit,
            newContent
        } = input


        if (newContent !== undefined) {
            if (typeof newContent !== "string") {
                throw new Error("'Content' deve ser string")
            }
        }
        
        const postDatabase = new PostDatabase()
        const postToEditDB = await postDatabase.findProductById(idToEdit)

        if (!postToEditDB) {
            throw new Error("'id' para editar não existe")
        }

        const post = new Posts(
           postToEditDB.id,
           postToEditDB.creator_id,
           postToEditDB.content,
           postToEditDB.likes,
           postToEditDB.dislikes,
           postToEditDB.created_at,
           postToEditDB.updated_at
        )

        // newId && post.setId(newId)
        newContent && post.setContent(newContent)
        
        const updatedPostDB: PostDB = {
            id: post.getId(),
            creator_id: post.getCreator_id(),
            content: post.getContent(),
            likes: post.getLikes(),
            dislikes: post.getDislikes(),
            created_at: post.getCreated_at(),
            updated_at: post.getUpdated_at()
        }

        

        await postDatabase.updatePost(updatedPostDB)

        const output = {
            message: "Produto editado com sucesso",
            post: updatedPostDB
        }

        // const output = this.productDTO.editProductOutput(product)

        return output
    }


    public deletePost = async (input: any) => {
        const { idToDelete } = input

        const postDatabase = new PostDatabase()
        const postToDeleteDB = await postDatabase.findProductById(idToDelete)

        if (!postToDeleteDB) {
            throw new Error("'id' para deletar não existe")
        }

        await postDatabase.deletePostById(postToDeleteDB.id)

        const output = {
            message: "Post deletado com sucesso"
        }

        return output
    }
}