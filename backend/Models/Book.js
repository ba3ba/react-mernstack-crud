const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  rollno: {
    type: String
  }
}, {
    collection: 'books'
  })

module.exports = mongoose.model('Book', bookSchema)