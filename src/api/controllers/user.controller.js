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
    const user = await user
      .findById(id)
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

exports.createUser = async (req, res) => {
  try {
    const { role, ...rest } = req.body
    const newUser = new User({
      ...rest,
      role: 'user'
    })
    const userSaved = await newUser.save()
    return res.status(201).json(userSaved)
  } catch (error) {
    return res.status(400).json('Ha ocurrido un error al crear el usuario ❌')
  }
}

exports.updateUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json('ID no válido ❌')
  }

  const { role, ...updates } = req.body

  try {
    const userUpdated = await User.findByIdAndUpdate(id, updates, {
      new: true
    })

    if (!userUpdated) {
      return res.status(404).json('Usuario no encontrado ❌')
    }

    return res.status(201).json(userUpdated)
  } catch (error) {
    return res
      .status(400)
      .json('Ha ocurrido un error actualizando el usuario ❌')
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
      user: updatedRole
    })
  } catch (error) {
    return res.status(400).json('Error actualizando rol de usuario ❌')
  }
}
