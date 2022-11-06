const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let subcriberSchema = new Schema({
  number: {
    type: Number
  }
}, {
    collection: 'subscribers'
  })

module.exports = mongoose.model('Subscriber', subscriberSchema)