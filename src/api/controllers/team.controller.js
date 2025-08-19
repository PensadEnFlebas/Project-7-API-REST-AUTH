const {
  deleteImgCloudinary
} = require('../../utils/eliminations/img.elimination')
const Team = require('../models/team.model')
const mongoose = require('mongoose')

exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate('players')
      .populate({
        path: 'userProperty',
        populate: [{ path: 'players' }, { path: 'team' }]
      })
    return res.status(200).json(teams)
  } catch (error) {
    return res.status(400).json('Ha ocurrido un error ❌')
  }
}

exports.getTeamById = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json('ID no válido ❌')
    }

    const team = await Team.findById(id)
      .populate('players')
      .populate({
        path: 'userProperty',
        populate: [{ path: 'players' }, { path: 'team' }]
      })

    if (!team) {
      return res.status(404).json('Equipo no encontrado ❌')
    }

    return res.status(200).json(team)
  } catch (error) {
    console.error(error)
    return res.status(400).json('Error al obtener el equipo ❌')
  }
}

exports.createTeam = async (req, res) => {
  try {
    const newTeam = new Team({
      ...req.body,
      userProperty: req.user._id
    })

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json('ID no válido ❌')
    }

    if (req.file) {
      newTeam.shieldURL = req.file.path
    }

    const teamSaved = await newTeam.save()
    return res
      .status(201)
      .json({ message: `Nuevo equipo creado: ${teamSaved.name} ✅`, teamSaved })
  } catch (error) {
    return res.status(400).json('Ha ocurrido un error ❌')
  }
}

exports.updateTeam = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json('ID no válido ❌')
    }

    const team = await Team.findById(id)
    if (!team) return res.status(404).json('Equipo no encontrado ❌')

    Object.keys(req.body).forEach((key) => {
      team[key] = req.body[key]
    })

    if (req.file) {
      if (team.shieldURL) {
        deleteImgCloudinary(team.shieldURL)
      }
      team.shieldURL = req.file.path
    }

    const teamUpdated = await team.save()
    return res.status(200).json(teamUpdated)
  } catch (error) {
    return res.status(400).json('Ha ocurrido un error ❌')
  }
}

exports.removeDataFromTeamArray = async (req, res) => {
  try {
    const { id } = req.params
    const team = await Team.findById(id)
    const isOwner = team.userProperty.toString() === req.user.id
    const { field, value } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json('ID de usuario no válido ❌')
    }

    if (!isOwner) {
      return res
        .status(403)
        .json('No tienes permisos para eliminar datos de este equipo ❌')
    }

    team = await Team.findById(id)
    if (!team) return res.status(404).json('Equipo no encontrado ❌')

    if (!Array.isArray(team[field])) {
      return res.status(400).json(`${field} no es un array ❌`)
    }

    team[field] = team[field].filter((item) => item !== value)
    await team.save()

    return res.status(200).json({ message: 'Dato borrado del array ✅', team })
  } catch (error) {
    return res.status(500).json('Error al eliminar el dato del equipo ❌')
  }
}

exports.deleteTeam = async (req, res) => {
  try {
    const { id } = req.params

    const team = await Team.findById(id)
    if (!team) return res.status(404).json('Equipo no encontrado ❌')

    const isAdmin = req.user.role === 'admin'
    const isOwner = team.userProperty.toString() === req.user.id

    if (!isAdmin && !isOwner) {
      return res
        .status(403)
        .json('No tienes permisos para eliminar este equipo ❌')
    }

    const teamDeleted = await Team.findByIdAndDelete(id)
    return res.status(200).json({
      message: 'Team deleted ✅',
      teamDeleted: teamDeleted
    })
  } catch (error) {
    return res.status(400).json('Ha ocurrido un error ❌')
  }
}
