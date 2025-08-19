const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 3
    },
    yearOfRegistration: { type: Number, required: true },
    country: { type: String, required: true },
    nickname: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 2
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    avatarURL: { type: String, trim: true, required: true, default: '' },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      default: null
    },
    players: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Player', default: [] }
    ]
  },
  { timestamps: true, collection: 'users' }
)

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()
  if (this.password.startsWith('$2b$')) return next()
  try {
    const hashed = bcrypt.hashSync(this.password, SALT_ROUNDS)
    this.password = hashed
    next()
  } catch (err) {
    next(err)
  }
})

module.exports = mongoose.model('User', userSchema)
