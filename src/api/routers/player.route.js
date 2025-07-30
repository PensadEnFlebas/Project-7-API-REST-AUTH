const playerRouter = require('express').Router()
const { isAuth, isAdmin } = require('../../middlewares/auth.middleware')
const {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer
} = require('../controllers/player.controller')

playerRouter.get('/', getAllPlayers)
playerRouter.get('/:id', isAuth, getPlayerById)
playerRouter.post('/', isAuth, isAdmin, createPlayer)
playerRouter.put('/:id', isAuth, isAdmin, updatePlayer)
playerRouter.delete('/:id', isAuth, isAdmin, deletePlayer)

module.exports = playerRouter
