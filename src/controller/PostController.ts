import { Posts } from "../models/Posts"
import { PostDB } from "../types"
import { PostDatabase } from "../database/PostDatabase"
import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness"

export class PostController {

    public getPost = async (req: Request, res: Response) => {
        try {
            const postBusiness = new PostBusiness()
            const output = await postBusiness.getPost()
    
            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public createPost = async (req: Request, res: Response) => {
        try {

            const input = {
                content: req.body.content,
            }

            const postBusiness = new PostBusiness()
            const output = await postBusiness.createPost(input)

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

            const postBusiness = new PostBusiness()
            const output = await postBusiness.editPost(input)

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

            const postBusiness = new PostBusiness()
            const output = await postBusiness.deletePost(input)

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