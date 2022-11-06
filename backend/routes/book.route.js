let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router()

// Student Model
let bookSchema = require('../models/Book');
let subscriberSchema = require('../models/Subscriber');
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);



router.route('/create-book').post((req, res, next) => {
  bookSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
      
    }
  })
  subscriberSchema.find(req.body,(error,data) =>{
    data.forEach(function(element) {
      client.messages
      .create({body: 'Hi there, a book has been uploaded', from: '+13609975467', to: element.number})
      .then(message => console.log(message.sid)).catch((err)=>{
        console.log(err)
      })
    });
  })
})

//create subscriber
router.route('/create-subscriber').post((req, res, next) => {
  subscriberSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
      console.log("There has been an error")
    } else {
      
      res.json(data)

    }
  })

})

// CREATE Student

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