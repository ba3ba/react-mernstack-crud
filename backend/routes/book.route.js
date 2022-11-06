let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router()

// Student Model
let bookSchema = require('../models/Book');
let subcriberSchema = require('../models/Subscriber')
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);




//create subscriber
router.route('/sms').post((req, res, next) => {
  
  subscriberSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
      
      client.messages
      .create({body: 'Hi there', from: '+13609975467', to: '+9103845533'})
      .then(message => console.log(message.sid));
    }
  })
})

// CREATE Student
router.route('/create-book').post((req, res, next) => {
  bookSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
      
    }
  })
})
// 


// READ Students
router.route('/').get((req, res) => {
  bookSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single Student
router.route('/edit-book/:id').get((req, res) => {
  bookSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Student
router.route('/update-book/:id').put((req, res, next) => {
  bookSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
        console.log(error)
      } else {
        res.json(data)
        console.log('Book updated successfully !')
      }
    },
  )
})

// Delete Student
router.route('/delete-book/:id').delete((req, res, next) => {
  bookSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})



module.exports = router
