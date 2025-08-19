const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

const userStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'NBAfantasyUSERS',
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp']
  }
})

const uploadUserImg = multer({ storage: userStorage })

module.exports = { uploadUserImg }
