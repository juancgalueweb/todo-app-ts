import cors from 'cors'
import express, { type Express } from 'express'
import todoRoutes from './routes/todos'
import userRoute from './routes/user'

// Using dotenv
import 'dotenv/config'

// Mongoose config
import './config/dbConnection'

const app: Express = express()

const PORT = 4000

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(todoRoutes)
app.use(userRoute)

app.listen(PORT, () => {
  console.log(`CORS-enabled web server listening on port ${PORT}`)
})
