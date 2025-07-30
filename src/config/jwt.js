const jwt = require('jsonwebtoken')

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role || 'user'
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d'
    }
  )
}

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    return null
  }
}

module.exports = { generateToken, verifyToken }
