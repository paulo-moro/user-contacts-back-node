import { Express } from 'express'
import { contactRoutes } from './contact.routes'
import { userRoutes } from './user.routes'


export const appRoutes = (app: Express) => {
    app.use("/users", userRoutes())
    app.use("/contact", contactRoutes())
  }