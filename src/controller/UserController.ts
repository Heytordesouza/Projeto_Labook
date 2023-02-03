import { Request, Response } from "express"
import { Users } from "../models/Users"
import { UserDatabase } from "../database/UserDatabase"
import { UserDB } from "../types"

export class UserController {

    createUser = async (req: Request, res: Response) => {
      try {
        const { name, email, password} = req.body

        const userDBInstance = new UserDatabase()
  
  
        if (name !== undefined) {
          if (typeof name !== "string") {
            res.status(400)
            throw new Error("'name' deve ser string")
          }
        }
  
        if (email !== undefined) {
          if (typeof email !== "string") {
            res.status(400)
            throw new Error("'email' deve ser string")
          }
        }
  
        if (password !== undefined) {
          if (typeof password !== "string") {
            res.status(400)
            throw new Error("'password' deve ser string")
          }
        }

        const lista = ['ADMIN', 'NORMAL']
        const role = lista[Math.floor(Math.random() * lista.length)]

  
        //Instanciando a classe User, porém passando os valores vindo das requisições e armazenando na variável userInstance.
        const userInstance = new Users(
          Math.floor(Date.now() * Math.random()).toString(3),
          name,
          email,
          password,
          role,
          new Date().toISOString()
        )
  
        //Para demonstrar a criação do usuário, precisamos acessar os valores que estão na classe, porém para acessar os valores na classe só será possível através dos métodos.
        const newUserDB: UserDB = {
          id: userInstance.getId(),
          name: userInstance.getName(),
          email: userInstance.getEmail(),
          password: userInstance.getPassword(),
          role: userInstance.getRole(),
          created_at: userInstance.getCreated_at(),
        }
        await userDBInstance.insertUser(userInstance)
  
        res.status(201).send({token: "um token jwt"})
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

    loginUser = async (req: Request, res: Response) => {
        try {
          const {email, password} = req.body
  
          const userDBInstance = new UserDatabase()
    
          if (email !== undefined) {
            if (typeof email !== "string") {
              res.status(400)
              throw new Error("'email' deve ser string")
            }
          }
    
          if (password !== undefined) {
            if (typeof password !== "string") {
              res.status(400)
              throw new Error("'password' deve ser string")
            }
          }
  
          const lista = ['ADMIN', 'NORMAL']
          const role = lista[Math.floor(Math.random() * lista.length)]

          const nomes = ['Fulano', 'Sicrano']
          const name = nomes[Math.floor(Math.random() * nomes.length)]
  
    
          //Instanciando a classe User, porém passando os valores vindo das requisições e armazenando na variável userInstance.
          const userInstance = new Users(
            Math.floor(Date.now() * Math.random()).toString(3),
            name,
            email,
            password,
            role,
            new Date().toISOString()
          )
    
          //Para demonstrar a criação do usuário, precisamos acessar os valores que estão na classe, porém para acessar os valores na classe só será possível através dos métodos.
          const newUserDB: UserDB = {
            id: userInstance.getId(),
            name: userInstance.getName(),
            email: userInstance.getEmail(),
            password: userInstance.getPassword(),
            role: userInstance.getRole(),
            created_at: userInstance.getCreated_at(),
          }
          await userDBInstance.insertUser(userInstance)
    
          res.status(200).send({token: "um token jwt"})
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
}

