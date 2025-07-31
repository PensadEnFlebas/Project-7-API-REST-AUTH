const express = require('express')
const dotenv = require('dotenv')
const { connectDB } = require('./src/config/db')
const path = require('path')

const cloudinary = require('cloudinary').v2

const playerRoutes = require('./src/api/routers/player.route')
const teamRoutes = require('./src/api/routers/team.route')
const userRoutes = require('./src/api/routers/user.route')
const authRoutes = require('./src/api/routers/auth.route')
const { connectCloudinary } = require('./src/config/cloudinary')

const app = express()

dotenv.config()
connectDB()
connectCloudinary()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  api_key: process.env.CLOUDINARY_API_KEY
})

app.use(express.json())
app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.use('/api/v1/teams', teamRoutes)
app.use('/api/v1/players', playerRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/auth', authRoutes)

app.use((req, res) => {
  return res.status(404).json('Route NOT found ❌')
})

app.listen(3000, () => {
  console.log('Servidor levantado en: http://localhost:3000')
})
