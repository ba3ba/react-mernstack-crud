const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let subscriberSchema = new Schema({
  number: {
    type: String
  }
}, {
    collection: 'subscribers'
  })

module.exports = mongoose.model('Subscriber', subscriberSchema);