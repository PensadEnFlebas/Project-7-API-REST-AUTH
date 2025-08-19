const {
  deleteImgCloudinary
} = require('../../utils/eliminations/img.elimination')
const { Player, ALLOWED_POSITIONS } = require('../models/player.model')
const mongoose = require('mongoose')

exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find().populate({
      path: 'userProperty',
      populate: [{ path: 'players' }, { path: 'team' }]
    })
    return res.status(200).json(players)
  } catch (error) {
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
    return res.status(400).json('Error al obtener el jugador ❌')
  }
}

exports.createPlayer = async (req, res) => {
  try {
    const newPlayer = new Player(req.body)

    if (req.file) {
      newPlayer.imgURL = req.file.path
    }

    const playerSaved = await newPlayer.save()
    return res.status(201).json(playerSaved)
  } catch (error) {
    return res.status(400).json('Ha ocurrido un error al crear un jugador ❌')
  }
}

exports.updatePlayer = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json('ID no válido ❌')
    }

    const updatedPlayer = await Player.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    })

    if (!updatedPlayer) return res.status(404).json('Jugador no encontrado ❌')

    res.status(200).json({
      message: `Jugador ${updatedPlayer.name} actualizado correctamente ✅`,
      player: updatedPlayer
    })
  } catch (error) {
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
      await deleteImgCloudinary(playerDeleted.imgURL)
    }

    return res
      .status(200)
      .json({ message: 'Jugador borrado ✅', playerDeleted })
  } catch (error) {
    return res.status(400).json('Ha ocurrido un error eliminando el jugador ❌')
  }
}
