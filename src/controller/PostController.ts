import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness"
import { PostDTO } from "../dtos/PostDTO"
import { BaseError } from "../errors/BaseError"

export class PostController {
    constructor(
        private postDTO: PostDTO,
        private postBusiness: PostBusiness
    ){}

    public getPost = async (req: Request, res: Response) => {
        try {
            const id = req.query.id
            const output = await this.postBusiness.getPost(id)
    
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

            const input = this.postDTO.createPostInput(req.body.content)

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
                idToDelete: req.params.id
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