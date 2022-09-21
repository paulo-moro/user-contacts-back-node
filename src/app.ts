import "reflect-metadata"
import "express-async-errors"
import swaggerUi from "swagger-ui-express"
import express from "express"
import { handleError } from "./middlewares/error.middleware"
import { appRoutes } from "./router"
import swaggerDocs from "./swagger.json"

const app = express()

app.use(express.json())

app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerDocs))

appRoutes(app)

app.use(handleError)

export default app