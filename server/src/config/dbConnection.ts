import mongoose from 'mongoose'
mongoose.set('strictQuery', false)

const LOCAL_DB = process.env.LOCAL_DB_URL

dbConnect().catch(err => {
  console.log(err)
})

export async function dbConnect(): Promise<void> {
  try {
    if (LOCAL_DB !== undefined) {
      await mongoose.connect(LOCAL_DB)
    }
    console.log('Database connected 🔥🔥🔥')
  } catch (error) {
    console.log('😒😒😒 connection refused!!!', error)
  }
}
