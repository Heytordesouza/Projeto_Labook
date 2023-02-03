import express, { Request, Response } from 'express'
import cors from 'cors'
import { UserController } from './controller/UserController'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

//Instanciando a classe UserController e armazenando em uma variável (userController)
const userController = new UserController()

//ENDPOINT de Criação de Usuário
app.post("/users/signup", userController.createUser)

app.get("/users/signup", userController.getUser)

app.post("/users/login", userController.createUser)

