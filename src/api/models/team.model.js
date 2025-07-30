const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    yearOfCreation: { type: Number, required: true },
    leaguesWon: Number,
    shieldURL: { type: String, required: true },
    userProperty: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    players: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Player', default: [] }
    ]
  },
  { timestamps: true, collection: 'teams' }
)

module.exports = mongoose.model('Team', teamSchema)
