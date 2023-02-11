import { BadRequestError } from "../errors/BadRequestError"
import { Users } from "../models/Users"

export interface CreateUserInputDTO {
    id: string,
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
        password: string
        createAt: string
    }
}

export interface LoginUserInputDTO {
    id: string,
    email: string,
    password: string
}

export interface LoginUserOutputDTO {
    message: string,
    user: {
        id: string,
        email: string,
        password: string
    }
}


export class UserDTO {
    public createUserInput(
        id: unknown,
        name: unknown,
        email: unknown,
        password: unknown
    ): CreateUserInputDTO{
        if (typeof id !== "string") {
            throw new BadRequestError("'id' deve ser string")
        }

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
        id,
        name,
        email,
        password
        }

        return dto
    }


    public createUserOutput(user: Users): CreateUserOutputDTO{
        const dto: CreateUserOutputDTO = {
            message: "Usuário registrado com sucesso",
            user: {
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                createAt: user.getCreated_at()
            }
        }
        return dto
    }

    public loginUserInput(
        id: unknown,
        email: unknown,
        password: unknown
    ): LoginUserInputDTO{
        if (typeof id !== "string") {
            throw new BadRequestError("'id' deve ser string")
        }

        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }
          
        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser string")
        }
        
        const dto: LoginUserInputDTO = {
        id,
        email,
        password
        }
    
        return dto

    }

    public loginUserOutput(user: Users): LoginUserOutputDTO{
        const dto: LoginUserOutputDTO = {
            message: "Usuário registrado com sucesso",
            user: {
                id: user.getId(),
                email: user.getEmail(),
                password: user.getPassword(),
            }
        }
        return dto
    }
}