import { Posts } from "../models/Posts"
import { PostDB } from "../types"
import { PostDatabase } from "../database/PostDatabase"
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

            const input = {
                content: req.body.content,
            }

            // const postBusiness = new PostBusiness()
            const output = await this.postBusiness.createPost(input)

            res.status(201).send(output)
        } catch (error) {
            console.log(error)
    
            if(res.statusCode === 200){
                res.status(500)
            }
            res.send(error.message)
        }    
    }

    public editPost = async (req: Request, res: Response) => {
        try {

            const input = {
                idToEdit: req.params.id,
                content: req.body.content,
            }

            // const postBusiness = new PostBusiness()
            const output = await this.postBusiness.editPost(input)

            res.status(200).send(output)
        } catch (error:any) {
            console.log(error)
    
            if(res.statusCode === 200){
                res.status(500)
            }
            res.send(error.message)
        }    
    }

    public deletePost = async (req: Request, res: Response) => {
        try {

            const input = {
                idToDelete: req.params.id
            }

            // const postBusiness = new PostBusiness()
            const output = await this.postBusiness.deletePost(input)

            res.status(200).send(output)
        } catch (error) {
            console.log(error)
    
            if(res.statusCode === 200){
                res.status(500)
            }
            res.send(error.message)
        }    
    }
    
}