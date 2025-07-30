const jwt = require('jsonwebtoken')
const { verifyToken } = require('../config/jwt')

exports.isAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Token requerido ❌' })

  const decoded = verifyToken(token)

  if (!decoded) {
    return res.status(401).json({ message: 'Token inválido ❌' })
  }

  req.user = decoded
  next()
}

exports.isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res
      .status(403)
      .json({ message: 'No puedes hacer esto sin un rol de Administrador ❌' })
  }
  next()
}
