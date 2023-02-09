import { UserDatabase } from "../database/UserDatabase"
import { Users } from "../models/Users"
import { UserDB } from "../types"

export class UserBusiness {
    public createUser = async (input: any) => {

        const {name, email, password} = input

        const userDBInstance = new UserDatabase()
  
  
        if (name !== undefined) {
          if (typeof name !== "string") {
            throw new Error("'name' deve ser string")
          }
        }
  
        if (email !== undefined) {
          if (typeof email !== "string") {
            throw new Error("'email' deve ser string")
          }
        }
  
        if (password !== undefined) {
          if (typeof password !== "string") {
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

        const output = {
            token: "um token jwt"
        }

        return(output)
    }

    
}