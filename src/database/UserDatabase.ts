import { BaseDatabase } from "./BaseDatabase"
import { Users } from "../models/Users"
import { UserDB, PostDB, Likes_dislikesDB } from "../types"

export class UserDatabase extends BaseDatabase {
    static TABLE_USERS = "users"

    private async checkUser(id: string | undefined, email: string | undefined): Promise <void> {
    
        if (id) {
            const [usersDB]: UserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({ id: id })
    
            if (usersDB) {
            throw new Error("'id' já cadastrado.")
            }
        }

        if (email) {
            const [usersDB]: UserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({ email: email })
    
            if (usersDB) {
            throw new Error("'email' já cadastrado.")
            }
        }
    }

    async insertUser(parameter: Users): Promise <void> {
        await this.checkUser(
            parameter.getId() as string,
            parameter.getEmail() as string
        )

        await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(parameter)
    }

    async findUser(parameter: string | undefined): Promise <UserDB[]> {
        let result
    
        if (parameter) {
          const usersDB: UserDB[] = await BaseDatabase
          .connection(UserDatabase.TABLE_USERS)
          .where("name", "LIKE", `%${parameter}%`)
    
          result = usersDB
    
        } else {
          const usersDB: UserDB[] = await BaseDatabase
          .connection(UserDatabase.TABLE_USERS)
          result = usersDB
        }
    
        return result
    }
}