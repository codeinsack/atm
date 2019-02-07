const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const homeController = require('./controllers/home')

const app = express()

app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.get('/', homeController.getAtms)

app.post('/', homeController.postAtm)

app.put('/', homeController.editAtm)

app.delete('/', homeController.deleteAtm)

mongoose.connect('mongodb+srv://codeInSack:YJEpQmV85CbUDsMG@cluster0-9kxja.mongodb.net/atm?retryWrites=true',
  { useNewUrlParser: true })
  .then(() => app.listen(3000))
  .catch(err => console.log(err))
