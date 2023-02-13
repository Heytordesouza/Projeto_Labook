import { Request, Response } from "express"
import { Users } from "../models/Users"
import { UserDatabase } from "../database/UserDatabase"
import { UserDB } from "../types"
import { UserBusiness } from "../business/UserBusiness"
import { UserDTO } from "../dtos/UserDTO"
import { BaseError } from "../errors/BaseError"

export class UserController {
  constructor(
    private userDTO: UserDTO,
    private userBusiness: UserBusiness
){}

    public createUser = async (req: Request, res: Response) => {
      try {

        const input = this.userDTO.createUserInput(
          req.body.name, 
          req.body.email, 
          req.body.password
        )

        const output = await this.userBusiness.createUser(input)
        
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

    public getAllUsers = async (req: Request, res: Response) => {
        try {
          const name = req.query.name as string | undefined
    
          const output = await this.userBusiness.getAllUsers(name)
    
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

    public loginUser = async (req: Request, res: Response) => {
        try {
          const input = this.userDTO.loginUserInput(
            req.body.email,
            req.body.password 
          )
  
          const output = await this.userBusiness.loginUser(input)
    
          res.status(200).send({output, token: "um token jwt"})
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

