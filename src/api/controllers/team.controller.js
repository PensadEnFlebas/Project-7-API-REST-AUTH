const {
  deleteImgCloudinary
} = require('../../utils/eliminations/img.elimination')
const Team = require('../models/team.model')
const mongoose = require('mongoose')

exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate({
        path: 'players',
        select: 'name position imgURL'
      })
      .populate({
        path: 'userProperty',
        select: 'name email nickname team players',
        populate: [
          { path: 'team', select: 'name shieldURL' },
          { path: 'players', select: 'name position imgURL' }
        ]
      })
    return res.status(200).json(teams)
  } catch (error) {
    console.error('Error en getAllTeams:', error)
    return res
      .status(400)
      .json('Ha ocurrido un error obteniendo los equipos ❌')
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
    console.error('Error en getTeamById:', error)
    return res.status(400).json('Error al obtener el equipo ❌')
  }
}

exports.createTeam = async (req, res) => {
  try {
    const newTeam = new Team({
      ...req.body,
      userProperty: req.user._id
    })

    if (req.file) {
      newTeam.shieldURL = req.file.path
    }

    if (req.body.shieldURL && !req.file) {
      newTeam.shieldURL = req.body.shieldURL
    }

    const teamSaved = await newTeam.save()
    return res
      .status(201)
      .json({ message: `Nuevo equipo creado: ${teamSaved.name} ✅`, teamSaved })
  } catch (error) {
    console.error('Error en createTeam:', error)
    return res
      .status(400)
      .json('No se ha podido crear correctamente el equipo ❌')
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

    const newShield = req.file?.path || req.body.shieldURL
    if (newShield && newShield !== team.shieldURL) {
      if (team.shieldURL) {
        try {
          await deleteImgCloudinary(team.shieldURL)
        } catch (err) {
          console.error('Error borrando escudo previo:', err)
          return res
            .status(400)
            .json('No se pudo eliminar la imagen anterior de Cloudinary ❌')
        }
      }

      team.shieldURL = newShield
    }

    Object.keys(req.body).forEach((key) => {
      team[key] = req.body[key]
    })

    const teamUpdated = await team.save()
    return res.status(200).json({
      message: `Equipo ${team.name} actualizado correctamente ✅`,
      teamUpdated
    })
  } catch (error) {
    console.error('Error en updateTeam:', error)
    return res.status(400).json('Error al actualizar el equipo ❌')
  }
}

exports.removeDataFromTeamArray = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json('ID de usuario no válido ❌')
    }

    const team = await Team.findById(id)
    team = await Team.findById(id)
    if (!team) return res.status(404).json('Equipo no encontrado ❌')

    const isOwner = team.userProperty.toString() === req.user.id
    if (!isOwner) {
      return res
        .status(403)
        .json('No tienes permisos para eliminar datos de este equipo ❌')
    }

    const { field, value } = req.body

    if (!Array.isArray(team[field])) {
      return res.status(400).json(`${field} no es un array ❌`)
    }

    team[field] = team[field].filter((item) => item !== value)
    await team.save()

    return res.status(200).json({ message: 'Dato borrado del array ✅', team })
  } catch (error) {
    console.error('Error en removeDataFromTeamArray:', error)
    return res.status(500).json('Error al eliminar el dato del equipo ❌')
  }
}

exports.deleteTeam = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json('ID de equipo no válido ❌')
    }

    const team = await Team.findById(id)
    if (!team) return res.status(404).json('Equipo no encontrado ❌')

    const isAdmin = req.user?.role === 'admin'
    const isOwner =
      team.userProperty && req.user
        ? team.userProperty.toString() === req.user.id
        : false

    if (!isAdmin && !isOwner) {
      return res
        .status(403)
        .json('No tienes permisos para eliminar este equipo ❌')
    }

    const teamDeleted = await Team.findByIdAndDelete(id)

    if (!teamDeleted) {
      return res.status(404).json('Equipo no encontrado ❌')
    }

    if (teamDeleted.shieldURL) {
      try {
        await deleteImgCloudinary(teamDeleted.shieldURL)
      } catch (error) {
        console.error('Error borrando escudo previo:', error)
        return res
          .status(400)
          .json('No se pudo eliminar la imagen de Cloudinary ❌')
      }
    }

    return res.status(200).json({
      message: 'Equipo eliminado correctamente ✅',
      teamDeleted
    })
  } catch (error) {
    console.error('Error en deleteTeam:', error)
    return res.status(400).json('No se ha podido eliminar el equipo ❌')
  }
}
