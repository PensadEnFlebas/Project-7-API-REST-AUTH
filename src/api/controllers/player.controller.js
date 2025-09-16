const {
  deleteImgCloudinary
} = require('../../utils/eliminations/img.elimination')
const { Player, ALLOWED_POSITIONS } = require('../models/player.model')
const mongoose = require('mongoose')

exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find().populate({
      path: 'userProperty',
      select: 'name email nickname team players',
      populate: [
        { path: 'team', select: 'name shieldURL' },
        { path: 'players', select: 'name position imgURL' }
      ]
    })
    return res.status(200).json(players)
  } catch (error) {
    console.error('Error en getAllPlayers:', error)
    return res
      .status(400)
      .json('Ha ocurrido un error recopilando todos los jugadores ❌')
  }
}

exports.getPlayerById = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json('ID no válido ❌')
    }

    const player = await Player.findById(id).populate({
      path: 'userProperty',
      populate: [{ path: 'players' }, { path: 'team' }]
    })

    if (!player) {
      return res.status(404).json('Jugador no encontrado ❌')
    }

    return res.status(200).json(player)
  } catch (error) {
    console.error('Error en getPlayerById:', error)
    return res.status(400).json('Error al obtener el jugador ❌')
  }
}

exports.createPlayer = async (req, res) => {
  try {
    const newPlayer = new Player(req.body)

    if (req.file) {
      newPlayer.imgURL = req.file.path
    }

    if (req.body.imgURL && !req.file) {
      newPlayer.imgURL = req.body.imgURL
    }

    const playerSaved = await newPlayer.save()
    return res
      .status(201)
      .json({ message: 'Jugador creado correctamente ✅', playerSaved })
  } catch (error) {
    console.error('Error en createPlayer:', error)
    return res.status(400).json('Ha ocurrido un error al crear un jugador ❌')
  }
}

exports.updatePlayer = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json('ID no válido ❌')
    }

    const player = await Player.findById(id)
    if (!player) return res.status(404).json('Jugador no encontrado ❌')

    const newImg = req.file?.path || req.body.imgURL
    if (newImg && newImg !== player.imgURL) {
      if (player.imgURL) {
        try {
          await deleteImgCloudinary(player.imgURL)
        } catch (err) {
          return res
            .status(400)
            .json('No se pudo eliminar la imagen anterior de Cloudinary ❌')
        }
      }

      player.imgURL = newImg
    }

    Object.keys(req.body).forEach((key) => {
      if (key in player) {
        player[key] = req.body[key]
      }
    })

    const playerUpdated = await player.save()

    res.status(200).json({
      message: `Jugador ${playerUpdated.name} actualizado correctamente ✅`,
      playerUpdated
    })
  } catch (error) {
    console.error('Error en updatePlayer:', error)
    res.status(400).json('Error al actualizar el jugador ❌')
  }
}

exports.removeDataFromPlayerArray = async (req, res) => {
  try {
    const { id } = req.params
    const { field, value } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json('ID de jugador no válido ❌')
    }

    const player = await Player.findById(id)

    if (!player) return res.status(404).json('Jugador no encontrado ❌')

    if (!Array.isArray(player[field])) {
      return res.status(400).json(`${field} no es un array ❌`)
    }

    if (field === 'position' && player[field].length <= 1) {
      return res
        .status(400)
        .json('❌ El jugador debe tener al menos 1️⃣ posición 🏀')
    }

    player[field] = player[field].filter((item) => item !== value)
    await player.save()
    return res
      .status(200)
      .json({ message: 'Dato borrado ok del array ✅', player })
  } catch (error) {
    console.error('Error en removeDataFromPlayerArray:', error)
    return res.status(500).json('Error al eliminar el dato del jugador ❌')
  }
}

exports.deletePlayer = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json('ID no válido ❌')
    }

    const playerDeleted = await Player.findByIdAndDelete(id)

    if (!playerDeleted) {
      return res.status(404).json('Jugador no encontrado ❌')
    }

    if (playerDeleted.imgURL) {
      try {
        await deleteImgCloudinary(playerDeleted.imgURL)
      } catch (error) {
        console.error('Error borrando imagen previa:', err)
        return res
          .status(400)
          .json('No se pudo eliminar la imagen de Cloudinary ❌')
      }
    }

    return res
      .status(200)
      .json({ message: 'Jugador borrado ✅', playerDeleted })
  } catch (error) {
    console.error('Error en deletePlayer:', error)
    return res.status(400).json('Ha ocurrido un error eliminando el jugador ❌')
  }
}
