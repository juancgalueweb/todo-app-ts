import cors from 'cors'
import express, { type Express } from 'express'
import todoRoutes from './routes/todos'
import userRoute from './routes/user'

// Using dotenv
import 'dotenv/config'

// Mongoose config
import './config/dbConnection'

const app: Express = express()

const PORT: string | number = process.env.PORT ?? 8000

app.use(cors())
app.use(express.json())
app.use(todoRoutes)
app.use(userRoute)

app.listen(PORT, () => {
  console.log(`CORS-enabled web server listening on port ${PORT}`)
})
