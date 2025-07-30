const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('MongoDB conectado ✅')
  } catch (error) {
    console.error('Error al conectar MongoDB ❌:', error)
    process.exit(1)
  }
}

module.exports = { connectDB }
