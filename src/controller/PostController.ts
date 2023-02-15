import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness"
import { CreatePostInput, GetPostsInput, PostDTO } from "../dtos/PostDTO"
import { BaseError } from "../errors/BaseError"

export class PostController {
    constructor(
        private postDTO: PostDTO,
        private postBusiness: PostBusiness
    ){}

    public getPost = async (req: Request, res: Response) => {
        try {
            const input: GetPostsInput = {
                q: req.query.q,
                token: req.headers.authorization
            }

            const output = await this.postBusiness.getPost(input)
    
            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)
  
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public createPost = async (req: Request, res: Response) => {
        try {

            const input: CreatePostInput = {
                token: req.headers.authorization,
                content: req.body.content
            }
             
            const output = await this.postBusiness.createPost(input)

            res.status(201).send({output, token: "um token jwt"})
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        } 
    }

    public editPost = async (req: Request, res: Response) => {
        try {

            const input = this.postDTO.editProductInput(
                req.params.id,
                req.headers.authorization,
                req.body.content
            )

            const output = await this.postBusiness.editPost(input)

            res.status(200).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public deletePost = async (req: Request, res: Response) => {
        try {

            const input = {
                idToDelete: req.params.id,
                token: req.headers.authorization
            }

            const output = await this.postBusiness.deletePost(input)

            res.status(200).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        } 
    }
    
}