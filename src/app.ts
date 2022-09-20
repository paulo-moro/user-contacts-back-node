import express from "express"
import { errorMiddleware } from "./middlewares/error.middleware"
import { appRoutes } from "./router"

const app = express()

app.use(express.json())

appRoutes(app)

app.use(errorMiddleware)

export default app