import { UserDatabase } from "../database/UserDatabase"
import { UserDTO } from "../dtos/UserDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { Users } from "../models/Users"
import { UserDB } from "../types"

export class UserBusiness {
  constructor(
    private userDTO: UserDTO,
    private userDatabase: UserDatabase
  ){}

    public createUser = async (input: any) => {

        const {id, name, email, password} = input

        const lista = ['ADMIN', 'NORMAL']
        const role = lista[Math.floor(Math.random() * lista.length)]

  
        //Instanciando a classe User, porém passando os valores vindo das requisições e armazenando na variável userInstance.
        const userInstance = new Users(
          id,
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
          created_at: userInstance.getCreated_at()
        }

        await this.userDatabase.insertUser(newUserDB)

        const output = this.userDTO.createUserOutput(userInstance)

        return(output)
    }

    public loginUser = async (input: any) => {

      const {id, email, password} = input

      const loginDBExists = await this.userDatabase.findUserById(id)

      if (loginDBExists) {
        throw new BadRequestError("'id' já existe")
      }

      const lista = ['ADMIN', 'NORMAL']
      const role = lista[Math.floor(Math.random() * lista.length)]

      const nomes = ['Fulano', 'Sicrano']
      const name = nomes[Math.floor(Math.random() * nomes.length)]
  
    
      //Instanciando a classe User, porém passando os valores vindo das requisições e armazenando na variável userInstance.
      const userInstance = new Users(
        id, 
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
      
      await this.userDatabase.insertUser(newUserDB)

      const output = this.userDTO.loginUserOutput(userInstance)

      return(output)
  }
}