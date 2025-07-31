const userRouter = require('express').Router()
const { isAuth, isAdmin } = require('../../middlewares/auth.middleware')
const { uploadUserImg } = require('../../middlewares/file.uploadUserImg')
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  changeUserRole
} = require('../controllers/user.controller')

userRouter.get('/', isAuth, isAdmin, getAllUsers)
userRouter.get('/:id', isAuth, getUserById)
userRouter.post('/', isAuth, uploadUserImg.single('avatarURL'), createUser)
userRouter.put('/:id', isAuth, uploadUserImg.single('avatarURL'), updateUser)
userRouter.delete('/:id', isAuth, isAdmin, deleteUser)
userRouter.patch('/:id/role', isAuth, isAdmin, changeUserRole)

module.exports = userRouter
