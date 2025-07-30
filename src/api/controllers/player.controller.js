const Player = require('../models/player.model')
const mongoose = require('mongoose')

exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find().populate({
      path: 'userProperty',
      populate: [{ path: 'players' }, { path: 'team' }]
    })
    return res.status(200).json(players)
  } catch (error) {
    return res.status(400).json('Ha ocurrido un error ❌')
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
    console.error(error)
    return res.status(400).json('Error al obtener el jugador ❌')
  }
}

exports.createPlayer = async (req, res) => {
  try {
    const newPlayer = new Player(req.body)
    const playerSaved = await newPlayer.save()
    return res.status(201).json(playerSaved)
  } catch (error) {
    return res.status(400).json('Ha ocurrido un error ❌')
  }
}

exports.updatePlayer = async (req, res) => {
  try {
    const { id } = req.params
    const newPlayer = new Player(req.body)
    newPlayer._id = id
    const playerUpdated = await Player.findByIdAndUpdate(id, newPlayer, {
      new: true
    })
    return res.status(201).json(playerUpdated)
  } catch (error) {
    return res.status(400).json('Ha ocurrido un error ❌')
  }
}

exports.deletePlayer = async (req, res) => {
  try {
    const { id } = req.params
    const newPlayer = new Player(req.body)
    newPlayer._id = id
    const playerDeleted = await Player.findByIdAndDelete(id)
    return res
      .status(201)
      .json({ message: 'Player deleted ✅', playerDeleted: playerDeleted })
  } catch (error) {
    return res.status(400).json('Ha ocurrido un error ❌')
  }
}
