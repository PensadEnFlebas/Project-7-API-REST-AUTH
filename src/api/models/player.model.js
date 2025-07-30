const mongoose = require('mongoose')
const ALLOWED_POSITIONS = ['PG', 'SG', 'SF', 'PF', 'C']

const playerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    age: Number,
    height: Number,
    position: {
      type: [String],
      required: true,
      set: (positions) => {
        return positions.map((pos) =>
          typeof pos === 'string' ? pos.toUpperCase() : pos
        )
      },
      validate: {
        validator: function (positions) {
          if (!Array.isArray(positions)) return false

          if (positions.length > 3) {
            this.invalidate(
              'position',
              'Un jugador no puede tener más de 3 posiciones.'
            )
            return false
          }

          const unique = new Set(positions)
          if (unique.size !== positions.length) {
            this.invalidate(
              'position',
              'Las posiciones no pueden estar repetidas.'
            )
            return false
          }

          const invalidValues = positions.filter(
            (pos) => !ALLOWED_POSITIONS.includes(pos)
          )
          if (invalidValues.length > 0) {
            this.invalidate(
              'position',
              `Las siguientes posiciones no son válidas: ${invalidValues.join(
                ', '
              )}. Opciones válidas: ${ALLOWED_POSITIONS.join(', ')}.`
            )
            return false
          }

          return true
        }
      }
    },
    realTeam: String,
    nbaFantasyTeam: { type: String, required: true, default: '' },
    imgURL: { type: String, required: true },
    stats: {
      gp: { type: Number, required: true },
      min: { type: Number, required: true },
      pts: { type: Number, required: true },
      fgPct: { type: Number, required: true },
      threePPct: { type: Number, required: true },
      reb: { type: Number, required: true },
      dreb: { type: Number, required: true },
      oreb: { type: Number, required: true },
      ast: { type: Number, required: true },
      stl: { type: Number, required: true },
      blk: { type: Number, required: true },
      pf: { type: Number, required: true },
      plusMinus: { type: Number, required: true }
    },
    userProperty: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true, collection: 'players' }
)

module.exports = mongoose.model('Player', playerSchema)
