import axios from 'axios'

import { randomInteger } from './core/utils'
import Queue from './core/queue'
import Atm from './core/atm'
import HomeRouteComponent from './route-components/home'

const queue = new Queue()

const atms = []
let homeRouteComponent

queue.on('Queue_Add', findFreeAtm)

generateQueue(2000, 4000)
getAllAtmsFromServer()

function getAllAtmsFromServer () {
  axios.get('http://localhost:3000')
    .then(serverAtms => {
      serverAtms.data.forEach(serverAtm => {
        const atm = new Atm(serverAtm._id, serverAtm.count, serverAtm.visits)
        atm.on('Atm_MakeFree', findFreeAtm)
        atm.on('Atm_MakeBusy', updateAtmOnServer.bind(null, atm))
        atms.push(atm)
      })
      console.log(atms)
      homeRouteComponent = new HomeRouteComponent({ queue: queue, atms: atms })
    })
    .catch(err => console.log(err))
}

function sendNewAtmToServer () {
  axios.post('http://localhost:3000', {
    count: 0,
    visits: [{ date: 'April, 19 6:14', duration: 1.51 }]
  })
    .then(response => console.log(response))
    .catch(err => console.log(err))
}

function updateAtmOnServer (atm) {
  axios.put('http://localhost:3000', {
    id: atm.id,
    count: atm.count,
    visits: atm.visits
  })
    .then(response => console.log(response))
    .catch(err => console.log(err))
}

function deleteAtmFromServer () {
  axios.delete('http://localhost:3000', { data: { id: '5c500be7b123b8011086f523' } })
    .then(response => console.log(response))
    .catch(err => console.log(err))
}

function generateQueue (min, max) {
  setTimeout(function () {
    queue.add()
    generateQueue(min, max)
  }, randomInteger(min, max))
}

function findFreeAtm () {
  setTimeout(function () {
    if (!atms) return
    var freeAtm = atms.find(function (atm) {
      return atm.isFree && queue.count > 0
    })
    if (freeAtm) {
      queue.remove()
      freeAtm.makeBusy()
    }
  }, 1000)
}
