const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

const teamStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'NBAfantasyTEAMS',
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp']
  }
})

const uploadTeamImg = multer({ storage: teamStorage })

module.exports = { uploadTeamImg }
