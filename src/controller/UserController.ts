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

    createUser = async (req: Request, res: Response) => {
      try {

        const input = this.userDTO.createUserInput(
          req.body.id,
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

    getUser = async (req: Request, res: Response) => {
        try {
          const name = req.query.name as string | undefined
    
          const usersDB: UserDB[] = await new UserDatabase().findUser(name)
    
          //Estabelecimento do MAP sempre para termos certeza de como os dados precisam ser retornados, os motivos para fazermos isso são vários, mas em geral é porque nunca teremos certeza de como estão nossos dados no DB, uma vez que alguém possa ter acesso e manipular manualmente um dado. Sem essa trativa, infelizmente você vai se deparar com muitas quebras do fluxo no endpoint.
          const users: Users[] = usersDB.map((element) =>
              new Users(
                element.id,
                element.name,
                element.email,
                element.password,
                element.role,
                element.created_at
              )
          )
    
          res.status(200).send(users)
        } catch (error) {
          console.log(error)

          if (error instanceof BaseError) {
              res.status(error.statusCode).send(error.message)
          } else {
              res.status(500).send("Erro inesperado")
          }
      }
    }

    loginUser = async (req: Request, res: Response) => {
        try {
          const input = this.userDTO.loginUserInput(
            req.body.id,
            req.body.email, 
            req.body.password
          )
  
          const output = await this.userBusiness.loginUser(input)
    
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
}

