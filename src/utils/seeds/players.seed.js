const mongoose = require('mongoose')
const { Player } = require('../../api/models/player.model')
const players = require('../../data/players.data')
require('dotenv').config()

const checkIfImageExists = async (url) => {
  try {
    const res = await fetch(url, { method: 'HEAD' })
    return res.ok
  } catch (err) {
    return false
  }
}

const runSeed = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('✅ Connected to MongoDB')

    const updatedPlayers = await Promise.all(
      players.map(async (player) => {
        const cloudinaryOK = await checkIfImageExists(player.imgURL)

        return {
          ...player,
          imgURL: cloudinaryOK
            ? player.imgURL
            : `/assets/players/${player.name
                .toLowerCase()
                .replace(/\s+/g, '_')}.png`
        }
      })
    )

    try {
      await Player.collection.drop()
      console.log('🚮 Eliminated players')
    } catch (err) {
      console.log(`⏩️ No collection to drop, so go ahead...`)
    }

    await Player.insertMany(updatedPlayers)
    console.log('✏️ Printed players seed')

    await mongoose.disconnect()
    console.log('⛓️‍💥 Disconnected from database')
  } catch (error) {
    console.error('❌ Error running players seed:', error)
    process.exit(1)
  }
}

runSeed()
