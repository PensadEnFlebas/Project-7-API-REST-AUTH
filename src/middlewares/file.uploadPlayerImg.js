const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

const playerStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'NBAfantasyPLAYERS',
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp']
  }
})

const uploadPlayerImg = multer({ storage: playerStorage })

module.exports = { uploadPlayerImg }
