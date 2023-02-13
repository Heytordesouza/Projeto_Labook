import { BadRequestError } from "../errors/BadRequestError"
import { Users } from "../models/Users"
import { Role, UserOutput } from "../types"

export interface GetUsersOutputDTO{
    message:string,
    users:{
        id:string,
        name:string,
        email:string,
        role:Role,
        created_at:string,
    }[]
}

export interface CreateUserInputDTO {
    name: string,
    email: string,
    password: string
}

export interface CreateUserOutputDTO {
    message: string,
    user: {
        id: string,
        name: string,
        email: string,
        role: Role,
        created_at: string
    }
}

export interface LoginUserInputDTO {
    email: string,
    password: string
}

export interface LoginUserOutputDTO {
    message: string,
    user: {
        id:string,
        name:string
    }
}


export class UserDTO {

    public GetUsersOutputDTO = (users:Users[]) : GetUsersOutputDTO => {
        const getUsers : UserOutput[]= 
        users.map((user)=> user.getUserOutput())
        const dto : GetUsersOutputDTO = {
            message:"Resultado da pesquisa",
            users: getUsers        
        }

        return dto
    }

    public createUserInput = (
        name: unknown,
        email: unknown,
        password: unknown
    ): CreateUserInputDTO => {

        if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser string")
        }
          
        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }
          
        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser string")
        }
          
        const dto: CreateUserInputDTO = {
        name,
        email,
        password
        }

        return dto
    }


    public createUserOutput = (user: Users): CreateUserOutputDTO => {
        const dto: CreateUserOutputDTO = {
            message: "Usuário registrado com sucesso",
            user: user.getUserOutput()
        }
        return dto
    }

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

    public loginUserOutput = (user: Users): LoginUserOutputDTO => {
        const dto: LoginUserOutputDTO = {
            message: "Usuário registrado com sucesso",
            user: {
                id: user.getId(),
                name: user.getName(),
            }
        }
        return dto
    }
}