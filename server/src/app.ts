import cors from 'cors'
import express, { type Express } from 'express'
import mongoose from 'mongoose'
import todoRoutes from './routes/todos'
import userRoute from './routes/user'

const app: Express = express()

const PORT: string | number = process.env.PORT ?? 8000
const DB_PASSWORD = process.env.MONGO_PASSWORD

app.use(cors())
app.use(express.json())
app.use(todoRoutes)
app.use(userRoute)

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const uri = `mongodb+srv://admin:${DB_PASSWORD}@cluster0.1cgdu29.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery', false)

mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT} 🔥🔥🔥`)
    })
  )
  .catch(error => {
    console.log('😒😒😒 connection refused!!!', error)
  })
