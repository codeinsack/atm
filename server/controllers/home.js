const Atm = require('../models/atm')

exports.getAtms = (req, res, next) => {
  Atm.find()
    .then(atms => {
      res.send(atms)
    })
    .catch(err => {
      console.log(err)
    })
}

exports.postAtm = (req, res, next) => {
  const count = req.body.count
  const visits = req.body.visits
  const atm = new Atm({ count: count, visits: visits })
  atm
    .save()
    .catch(err => console.log(err))
}

exports.editAtm = (req, res, next) => {
  const id = req.body.id
  const updatedCount = req.body.count
  const updatedVisits = req.body.visits
  Atm.findById(id)
    .then(atm => {
      atm.count = updatedCount
      atm.visits = updatedVisits
      return atm.save()
    })
    .then(atms => res.send(atms))
    .catch(err => console.log(err))
}

exports.deleteAtm = (req, res, next) => {
  console.log(req.body)
  const id = req.body.id
  Atm.findByIdAndRemove(id)
    .then(atms => res.send(atms))
    .catch(err => console.log(err))
}
