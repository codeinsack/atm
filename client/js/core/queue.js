import EventEmitter from './eventEmitter'

export default class Queue extends EventEmitter {
  constructor () {
    super()
    this.count = 0
  }

  add () {
    this.count++
    this.emit('Queue_Add')
  }

  remove () {
    this.count--
    this.emit('Queue_Remove')
  }
}
