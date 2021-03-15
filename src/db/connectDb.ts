import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI!)
    const con = await mongoose.connect(process.env.MONGO_URI!, {
      useUnifiedTopology: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    console.log(`MongoDb is CONNECTED---------${con.connection.host}`)
  } catch (err) {
    console.log(`MONGOOSE ERROR-----------${err.message}`)
  }
}
