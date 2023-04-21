import mongoose from 'mongoose'
mongoose.set('strictQuery', false)

// const LOCAL_DB = process.env.LOCAL_DB_URL
const DEPLOYMENT_DB = process.env.MONGO_URI

dbConnect().catch(err => {
  console.log(err)
})

export async function dbConnect(): Promise<void> {
  try {
    if (DEPLOYMENT_DB !== undefined) {
      await mongoose.connect(DEPLOYMENT_DB)
    }
    console.log('Database connected 🔥🔥🔥')
  } catch (error) {
    console.log('😒😒😒 connection refused!!!', error)
  }
}
