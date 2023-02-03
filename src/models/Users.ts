export class Users{
    constructor(
        private id:string,
        private name:string,
        private email:string,
        private password:string,
        private role:string,
        private created_at:string
    ){}


    public getId(){
        return this.id
    }

    public setId(newId:string): void{
        this.id = newId
    }

    public getName(){
        return this.name
    }

    public setName(newName:string): void{
        this.name = newName
    }

    public getEmail(){
        return this.email
    }

    public setEmail(newEmail:string): void{
        this.email = newEmail
    }

    public getPassword(){
        return this.password
    }

    public setPassword(newPassword:string): void{
        this.password = newPassword
    }

    public getRole(){
        return this.role
    }

    public setRole(newRole:string): void{
        this.role = newRole
    }

    public getCreated_at(){
        return this.created_at
    }

    public setCreated_at(newCreated_at:string): void{
        this.created_at = newCreated_at
    }
}