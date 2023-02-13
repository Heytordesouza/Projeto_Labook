import express from "express"
import { PostBusiness } from "../business/PostBusiness"
import { PostController } from "../controller/PostController"
import { PostDatabase } from "../database/PostDatabase"
import { UserDatabase } from "../database/UserDatabase"
import { PostDTO } from "../dtos/PostDTO"

export const postRouter = express.Router()

const postController = new PostController(
    new PostDTO(),
    new PostBusiness(
        new PostDTO(),
        new PostDatabase(),
        new UserDatabase()
    )
)

postRouter.get("/", postController.getPost)
postRouter.post("/", postController.createPost)
postRouter.put("/:id", postController.editPost)
postRouter.delete("/:id", postController.deletePost)
