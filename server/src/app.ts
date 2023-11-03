import cors from 'cors'
import express, { type Express } from 'express'
import { registerUserRouter } from './routes/register.routes'
import { tagRouter } from './routes/tags.routes'
import { todoRouter } from './routes/todos.routes'
import { verifyEmailRouter } from './routes/verifyEmail.routes'

// Using dotenv
import 'dotenv/config'

// Mongoose config
import './config/dbConnection'

const app: Express = express()

const PORT = 4000

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173', 'https://todos.juancgalue-web.cl']
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', todoRouter)
app.use('/api/auth', verifyEmailRouter)
app.use('/api', tagRouter)
app.use('/api/auth', registerUserRouter)

const server = app.listen(PORT, () => {
  console.log(`CORS-enabled web server listening on port ${PORT}`)
})

process.on('SIGINT', () => {
  console.log('Shutting down the server...')
  server.close(() => {
    console.log('Server has been shut down!')
    process.exit(0)
  })
})
