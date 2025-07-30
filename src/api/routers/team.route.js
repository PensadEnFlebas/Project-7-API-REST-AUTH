const teamRouter = require('express').Router()
const { isAuth } = require('../../middlewares/auth.middleware')
const {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam
} = require('../controllers/team.controller')

teamRouter.get('/', isAuth, getAllTeams)
teamRouter.get('/:id', isAuth, getTeamById)
teamRouter.post('/', isAuth, createTeam)
teamRouter.put('/:id', isAuth, updateTeam)
teamRouter.delete('/:id', isAuth, deleteTeam)

module.exports = teamRouter
