const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookSchema = new Schema({
  name: {
    type: String
  },
  email: {
  //author  
    type: String
  },
  rollno: {
    type: String
  }
}, {
    collection: 'books'
  })

module.exports = mongoose.model('Book', bookSchema)