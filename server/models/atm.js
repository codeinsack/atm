const mongoose = require('mongoose')

const Schema = mongoose.Schema

const atmSchema = new Schema({
  count: {
    type: Number
  },
  visits: [{
    date: String,
    duration: Number
  }]
})

module.exports = mongoose.model('Atm', atmSchema)
