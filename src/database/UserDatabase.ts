import { BaseDatabase } from "./BaseDatabase"
import { Users } from "../models/Users"
import { UserDB, PostDB, Likes_dislikesDB } from "../types"

export class UserDatabase extends BaseDatabase {
    static TABLE_USERS = "users"

    public getAllUsers = async (): Promise <UserDB[]> => {
        const result: UserDB[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        return result
    }

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

    public insertUser = async (newUserDB: UserDB): Promise <void> => {
        await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .insert(newUserDB)
    }

    public findUser = async (name: string | undefined): Promise <UserDB[]> => {
        let result
    
        if (name) {
          const usersDB: UserDB[] = await BaseDatabase
          .connection(UserDatabase.TABLE_USERS)
          .where("name", "LIKE", `%${name}%`)
    
          result = usersDB
    
        } else {
          const usersDB: UserDB[] = await BaseDatabase
          .connection(UserDatabase.TABLE_USERS)
          result = usersDB
        }
    
        return result
    }

    public findUserById = async (id: string) :Promise<UserDB| undefined>=> {
        const [ userDB ]: UserDB[] | undefined[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({ id })

        return userDB
    }

    public getUserByEmail = async (email: string): Promise<UserDB | undefined> => {
        const [result]: UserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({ email })
        return result
    }

    public async deleteUserById(id: string) {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .delete()
            .where({ id })
    }
}