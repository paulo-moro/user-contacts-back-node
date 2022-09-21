import "reflect-metadata"
import "express-async-errors"
import express from "express"
import { handleError } from "./middlewares/error.middleware"
import { appRoutes } from "./router"

const app = express()

app.use(express.json())


appRoutes(app)

app.use(handleError)

export default app