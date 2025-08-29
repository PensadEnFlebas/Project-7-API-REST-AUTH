const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const { generateToken } = require('../../config/jwt')

exports.register = async (req, res) => {
  try {
    const {
      email,
      password,
      nickname,
      name,
      yearOfRegistration,
      country,
      avatarURL
    } = req.body

    const existingEmail = await User.findOne({ email })
    if (existingEmail)
      return res.status(400).json({ message: 'Email ya registrado ❌' })

    const existingNickname = await User.findOne({ nickname })
    if (existingNickname)
      return res.status(400).json({ message: 'Nickname ya registrado ❌' })

    const newUser = new User({
      email,
      password,
      nickname,
      name,
      yearOfRegistration,
      country,
      avatarURL
    })

    const savedUser = await newUser.save()
    return res.status(201).json({
      message: 'Usuario creado ✅',
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        nickname: savedUser.nickname,
        avatarURL: savedUser.avatarURL,
        country: savedUser.country,
        yearOfRegistration: savedUser.yearOfRegistration
      }
    })
  } catch (error) {
    console.error('Error en register:', error)
    return res.status(500).json({ message: 'Error en registro ❌', error })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email y contraseña son obligatorios ❌' })
    }

    const user = await User.findOne({ email }).select('+password')
    if (!user)
      return res
        .status(401)
        .json({ message: 'Usuario o contraseña incorrectos ❌' })

    const isMatch = bcrypt.compareSync(password.trim(), user.password)
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: 'Usuario o contraseña incorrectos ❌' })
    }

    const token = generateToken(user)

    return res.status(200).json({
      message: 'Login correcto ✅',
      token,
      user: {
        id: user._id,
        email: user.email,
        nickname: user.nickname,
        role: user.role || 'user'
      }
    })
  } catch (error) {
    console.error('Error en login:', error)
    return res.status(500).json({ message: 'Error en login ❌', error })
  }
}
