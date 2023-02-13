import { UserDatabase } from "../database/UserDatabase"
import { GetUsersOutputDTO, UserDTO } from "../dtos/UserDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { Users } from "../models/Users"
import { Role, UserDB } from "../types"

export class UserBusiness {
  constructor(
    private userDTO: UserDTO,
    private userDatabase: UserDatabase
  ){}


  public getAllUsers = async (name:string | undefined): Promise<GetUsersOutputDTO> =>{
     
    const usersDB:UserDB[] = await this.userDatabase.getAllUsers()
    const users: Users[] = usersDB.map((user)=>{
        return new Users(
            user.id,
            user.name,
            user.email,
            user.password,
            user.role,
            user.created_at,
        )
    })
    
    const output = this.userDTO.GetUsersOutputDTO(users)

    return output
  }

  public createUser = async (input: any) => {

    const {
      name, 
      email, 
      password} = input

      const userVerification = await this.userDatabase.getUserByEmail(email)
        if(userVerification){
          throw new BadRequestError("Email ja cadastrado")
      }

      const userInstance = new Users(
        Math.floor(Date.now() * Math.random()).toString(3),
        name,
        email,
        password,
        Role.USER,
        new Date().toISOString()
      )
  
      await this.userDatabase.insertUser(userInstance.userToDatabase())

      const output = this.userDTO.createUserOutput(userInstance)

      return(output)
  }

  public loginUser = async (input: any) => {

    const {
      email, 
      password} = input

    const user = await this.userDatabase.getUserByEmail(email)
      if(!user){
        throw new NotFoundError("Usuario não encontrado")
      }

      if(password!==user.password){
         throw new NotFoundError("Senha incorreta")
      }

    const userLogin = new Users(
      user.id,
      user.name,
      user.email,
      user.password,
      user.role,
      user.created_at,
    )
  
    const output = this.userDTO.loginUserOutput(userLogin)

    return(output)
  }
}