var express = require('express');
var router = express.Router();
require('dotenv').config(); // installed dotenv module to place the mongodb url
const mongoose = require("mongoose");
const Message = require('../model/message')

mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URL); // inserted the collection name before the url options (...mongodb.net/mini_messageboard?retryWrites...)
}

// const messages = [
//   {
//     text: "Hi there!",
//     user: "Amando",
//     added: new Date()
//   },
//   {
//     text: "Hello World!",
//     user: "Charles",
//     added: new Date()
//   }
// ];

/* GET home page. */
router.get('/', async function(req, res, next) {
  // res.render('index', { title: 'Mini Messageboard', messages: messages });
  await Message.find().then( data => {
    res.render('index', { title: 'Mini Messageboard', posts: data });
  })
});

router.get('/new', function(req, res, next) {
  res.render('form', { title: 'New Message' })
})

router.post('/new', async function(req, res){
  // messages.push({text: req.body.message, user: req.body.name, added: new Date()});
  const message = new Message({
    text: req.body.message,
    user: req.body.name,
    added: new Date()
  });
  await message.save();
  res.redirect('/');
})

module.exports = router;
