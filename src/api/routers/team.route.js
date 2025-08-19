const teamRouter = require('express').Router()
const { isAuth } = require('../../middlewares/auth.middleware')
const { uploadTeamImg } = require('../../middlewares/file.uploadTeamImg')
const {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  removeDataFromTeamArray,
  deleteTeam
} = require('../controllers/team.controller')

teamRouter.get('/', isAuth, getAllTeams)
teamRouter.get('/:id', isAuth, getTeamById)
teamRouter.post('/', isAuth, uploadTeamImg.single('shieldURL'), createTeam)
teamRouter.put('/:id', isAuth, uploadTeamImg.single('shieldURL'), updateTeam)
teamRouter.patch(
  '/:id/remove-data-from-team-array',
  isAuth,
  uploadTeamImg.single('shieldURL'),
  removeDataFromTeamArray
)
teamRouter.delete('/:id', isAuth, deleteTeam)

module.exports = teamRouter
