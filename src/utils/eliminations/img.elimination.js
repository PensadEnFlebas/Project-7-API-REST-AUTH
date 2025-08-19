const cloudinary = require('cloudinary').v2

const deleteImgCloudinary = async (imgUrl) => {
  if (!imgUrl) return

  try {
    const imgSplited = imgUrl.split('/')
    const nameSplited = imgSplited.at(-1).split('.')[0]
    const folderSplited = imgSplited.at(-2)
    const public_id = `${folderSplited}/${nameSplited}`

    const result = await cloudinary.uploader.destroy(public_id)
    console.log('Imagen eliminada en ☁️ Cloudinary ✅', result)
  } catch (error) {
    console.error('Error al eliminar imagen en ☁️ Cloudinary ❌', error)
    throw error
  }
}

module.exports = { deleteImgCloudinary }
