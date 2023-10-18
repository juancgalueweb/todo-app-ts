import cors from 'cors'
import express, { type Express } from 'express'
import { tagRouter } from './routes/tags.routes'
import { todoRouter } from './routes/todos.routes'
import { userRouter } from './routes/user.routes'

// Using dotenv
import 'dotenv/config'

// Mongoose config
import './config/dbConnection'

const app: Express = express()

const PORT = 3000

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173', 'http://localhost:3001']
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', todoRouter)
app.use('/api', userRouter)
app.use('/api', tagRouter)

app.listen(PORT, () => {
  console.log(`CORS-enabled web server listening on port ${PORT}`)
})
