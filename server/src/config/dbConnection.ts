import mongoose from 'mongoose'
import { MSGS_RESPONSES } from '../constants/msgs'
mongoose.set('strictQuery', false)

const LOCAL_DB = process.env.LOCAL_DB_URL
const DEPLOYMENT_DB = process.env.MONGO_URI
const dbUrl = process.env.NODE_ENV === 'production' ? DEPLOYMENT_DB : LOCAL_DB

dbConnect().catch(err => {
  console.log(err)
})

export async function dbConnect(): Promise<void> {
  try {
    if (dbUrl !== undefined) {
      await mongoose.connect(dbUrl)
    }
    console.log(MSGS_RESPONSES.DB_CONNECTED)
  } catch (error) {
    console.log(MSGS_RESPONSES.DB_CONNECTION_PROBLEM, error)
  }
}
