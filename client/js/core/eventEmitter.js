export default class EventEmitter {
  constructor () {
    this.eventTable = {}
  }

  on (event, callback) {
    if (!this.eventTable.hasOwnProperty(event)) {
      this.eventTable[event] = []
    }
    this.eventTable[event].push(callback)
  }

  emit (event, ...rest) {
    if (event in this.eventTable) {
      this.eventTable[event].forEach(callback => {
        callback.apply(null, rest)
      })
    }
  }
}
