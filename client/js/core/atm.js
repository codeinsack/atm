import { randomInteger, formatDate } from './utils'
import EventEmitter from './eventEmitter'

const MINIMUM_DELAY_ATM = 1000
const MAXIMUM_DELAY_ATM = 3000

export default class Atm extends EventEmitter {
  constructor (id, count, visits) {
    super()
    this.id = id
    this.count = count
    this.visits = visits
    this.isFree = true
  }

  makeBusy () {
    this.count++
    this.isFree = false
    this.startTime = new Date()
    this.emit('Atm_MakeBusy')
    setTimeout(() => {
      this.makeFree()
    }, randomInteger(MINIMUM_DELAY_ATM, MAXIMUM_DELAY_ATM))
  }

  makeFree () {
    const formattedStartTime = formatDate(this.startTime)
    const serviceTime = (new Date() - this.startTime) / 1000
    this.isFree = true
    this.visits.push({ date: formattedStartTime, duration: serviceTime })
    this.emit('Atm_MakeFree')
  }
}
