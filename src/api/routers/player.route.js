const playerRouter = require('express').Router()
const { isAuth, isAdmin } = require('../../middlewares/auth.middleware')
const {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  removeDataFromPlayerArray,
  deletePlayer
} = require('../controllers/player.controller')
const { uploadPlayerImg } = require('../../middlewares/file.uploadPlayerImg')

playerRouter.get('/', isAuth, getAllPlayers)
playerRouter.get('/:id', isAuth, getPlayerById)
playerRouter.post(
  '/',
  isAuth,
  isAdmin,
  uploadPlayerImg.single('imgURL'),
  createPlayer
)
playerRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  uploadPlayerImg.single('imgURL'),
  updatePlayer
)
playerRouter.patch(
  '/:id/remove-data-from-player-array',
  isAuth,
  isAdmin,
  uploadPlayerImg.single('imgURL'),
  removeDataFromPlayerArray
)
playerRouter.delete('/:id', isAuth, isAdmin, deletePlayer)

module.exports = playerRouter
