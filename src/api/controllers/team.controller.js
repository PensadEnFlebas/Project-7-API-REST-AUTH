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

    const team = await team
      .findById(id)
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
    const newTeam = new Team(req.body)
    const teamSaved = await newTeam.save()
    return res.status(201).json(teamSaved)
  } catch (error) {
    return res.status(400).json('Ha ocurrido un error ❌')
  }
}

exports.updateTeam = async (req, res) => {
  try {
    const { id } = req.params
    const newTeam = new Team(req.body)
    newTeam._id = id
    const teamUpdated = await Team.findByIdAndUpdate(id, newTeam, {
      new: true
    })
    return res.status(201).json(teamUpdated)
  } catch (error) {
    return res.status(400).json('Ha ocurrido un error ❌')
  }
}

exports.deleteTeam = async (req, res) => {
  try {
    const { id } = req.params
    const newTeam = new Team(req.body)
    newTeam._id = id
    const teamDeleted = await Team.findByIdAndDelete(id)
    return res.status(201).json({
      message: 'Team deleted ✅',
      teamDeleted: teamDeleted
    })
  } catch (error) {
    return res.status(400).json('Ha ocurrido un error ❌')
  }
}
