import express from 'express'
import cors from 'cors'
import UsersRouter from './Users/users.router'
const app: express.Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(UsersRouter)

export default app
