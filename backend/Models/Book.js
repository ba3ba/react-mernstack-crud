const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  }
}, {
    collection: 'books'
  })

module.exports = mongoose.model('Book', bookSchema)