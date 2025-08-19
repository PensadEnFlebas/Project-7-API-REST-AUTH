const {
  deleteImgCloudinary
} = require('../../utils/eliminations/img.elimination')
const User = require('../models/user.model')
const mongoose = require('mongoose')

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate('players')
      .populate({
        path: 'team',
        populate: [{ path: 'players' }, { path: 'userProperty' }]
      })
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json('Ha ocurrido un error ❌')
  }
}

exports.getUserById = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json('ID no válido ❌')
  }

  try {
    const user = await User.findById(id)
      .populate('players')
      .populate({
        path: 'team',
        populate: [{ path: 'players' }, { path: 'userProperty' }]
      })

    if (!user) {
      return res.status(404).json('Usuario no encontrado ❌')
    }

    return res.status(200).json(user)
  } catch (error) {
    console.error(error)
    return res.status(500).json('Error al obtener el usuario ❌')
  }
}

exports.updateUser = async (req, res) => {
  const { id } = req.params
  const isSelf = req.user.id === id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json('ID no válido ❌')
  }

  if (!isSelf) {
    return res
      .status(403)
      .json('No tienes permisos para actualizar este usuario ❌')
  }

  const { role, ...updates } = req.body

  try {
    const userToUpdate = await User.findById(id)
    if (!userToUpdate) return res.status(404).json('Usuario no encontrado ❌')

    if (req.file) {
      if (userToUpdate.avatarURL) deleteImgCloudinary(userToUpdate.avatarURL)
      updates.avatarURL = req.file.path
    }

    const userUpdated = await User.findByIdAndUpdate(id, updates, {
      new: true
    })

    if (!userUpdated) {
      return res.status(404).json('Usuario no encontrado ❌')
    }

    return res.status(201).json({
      message: 'Usuario actualizado ✅',
      user: userUpdated
    })
  } catch (error) {
    return res
      .status(400)
      .json('Ha ocurrido un error actualizando el usuario ❌')
  }
}

exports.removeDataFromUserArray = async (req, res) => {
  try {
    const { id } = req.params
    const isSelf = req.user.id === id
    const { field, value } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json('ID de usuario no válido ❌')
    }

    if (!isSelf) {
      return res
        .status(403)
        .json('No tienes permisos para eliminar datos de este usuario ❌')
    }

    const user = await User.findById(id)
    if (!user) return res.status(404).json('Usuario no encontrado ❌')

    if (!Array.isArray(user[field])) {
      return res.status(400).json(`${field} no es un array ❌`)
    }

    if (field === 'roles' && user[field].length <= 1) {
      return res.status(400).json('❌ El usuario debe tener al menos un rol')
    }

    user[field] = user[field].filter((item) => item !== value)
    await user.save()

    return res.status(200).json({ message: 'Dato borrado del array ✅', user })
  } catch (error) {
    return res.status(500).json('Error al eliminar el dato del usuario ❌')
  }
}

exports.deleteUser = async (req, res) => {
  const { id } = req.params
  const isAdmin = req.user.role === 'admin'
  const isSelf = req.user.id === id

  if (!isAdmin && !isSelf) {
    return res
      .status(403)
      .json('No tienes permisos para eliminar este usuario ❌')
  }

  try {
    const userDeleted = await User.findByIdAndDelete(id)

    if (!userDeleted) {
      return res.status(404).json('Usuario no encontrado ❌')
    }

    return res.status(201).json({
      message: 'Usuario eliminado ✅',
      userDeleted: userDeleted
    })
  } catch (error) {
    return res
      .status(400)
      .json('Ha ocurrido un error al eliminar el usuario ❌')
  }
}

exports.changeUserRole = async (req, res) => {
  const { id } = req.params
  const { role } = req.body

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json('Rol inválido ❌')
  }

  try {
    const updatedRole = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    )
    return res.status(200).json({
      message: 'Rol actualizado ✅',
      nickname: updatedUser.nickname,
      user: updatedRole
    })
  } catch (error) {
    return res.status(400).json('Error actualizando rol de usuario ❌')
  }
}
