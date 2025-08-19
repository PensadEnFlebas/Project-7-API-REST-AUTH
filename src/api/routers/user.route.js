const userRouter = require('express').Router()
const { isAuth, isAdmin } = require('../../middlewares/auth.middleware')
const { uploadUserImg } = require('../../middlewares/file.uploadUserImg')
const {
  getAllUsers,
  getUserById,
  updateUser,
  removeDataFromUserArray,
  deleteUser,
  changeUserRole
} = require('../controllers/user.controller')

userRouter.get('/', isAuth, isAdmin, getAllUsers)
userRouter.get('/:id', isAuth, isAdmin, getUserById)
userRouter.put('/:id', isAuth, uploadUserImg.single('avatarURL'), updateUser)
userRouter.patch(
  '/:id/remove-data-from-user-array',
  isAuth,
  removeDataFromUserArray
)
userRouter.delete('/:id', isAuth, deleteUser)
userRouter.patch('/:id/role', isAuth, isAdmin, changeUserRole)

module.exports = userRouter
