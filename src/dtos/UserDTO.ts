import { BadRequestError } from "../errors/BadRequestError"
import { Users } from "../models/Users"
import { USER_ROLES } from "../services/TokenManager"
import { UserOutput } from "../types"

export interface GetUsersOutputDTO{
    message:string,
    users:{
        id:string,
        name:string,
        email:string,
        role:USER_ROLES,
        created_at:string,
    }[]
}

export interface SignupUserInputDTO {
    name: string,
    email: string,
    password: string
}

export interface SignupUserOutputDTO {
    message: string,
    token: string
}

export interface LoginUserInputDTO {
    email: string,
    password: string
}

export interface LoginUserOutputDTO {
    message: string,
    token: string
}


export class UserDTO {

    public getUsersOutputDTO = (users:Users[]) : GetUsersOutputDTO => {
        const getUsers : UserOutput[]= 
        users.map((user)=> user.getUserOutput())
        const dto : GetUsersOutputDTO = {
            message:"Resultado da pesquisa",
            users: getUsers        
        }

        return dto
    }

    public signupUserInput = (
        name: unknown,
        email: unknown,
        password: unknown
    ): SignupUserInputDTO => {

        if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser string")
        }
          
        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }
          
        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser string")
        }
          
        const dto: SignupUserInputDTO = {
        name,
        email,
        password
        }

        return dto
    }


    // public signupUserOutput = (user: Users): SignupUserOutputDTO => {
    //     //criar token
    //     const tokenPayload: TokenPayload ={
    //         id: newUser.getId(),
    //         name: newUser.getName(),
    //         role: newUser.getRole()
    //     }

    //     const token = this.tokenManager.createToken(tokenPayload)
    //     //

    //     const output: SignupOutput = {
    //         message: "Cadastro realizado com sucesso",
    //         token: token
    //     }
    //     return dto
    // }

    public loginUserInput = (
        email: unknown,
        password: unknown
    ): LoginUserInputDTO => {

        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }
          
        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser string")
        }
        
        const dto: LoginUserInputDTO = {
        email,
        password
        }
    
        return dto

    }

    // public loginUserOutput = (user: Users): LoginUserOutputDTO => {
    //     const dto: LoginUserOutputDTO = {
    //         message: "Usuário registrado com sucesso",
    //         user: {
    //             id: user.getId(),
    //             name: user.getName(),
    //         }
    //     }
    //     return dto
    // }
}