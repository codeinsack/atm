import Component from './component'

export default class QueueComponent extends Component {
  constructor ({ queue }) {
    super({ queue })
    queue.on('Queue_Add', this.fn.bind(this))
    queue.on('Queue_Remove', this.fn.bind(this))
    this.setTemplate()
    this.element = this.createElement()
  }

  fn () {
    this.setTemplate()
    this.element.innerHTML = this.render(true)
  }

  setTemplate () {
    this.template = `<div class="rect queue">
                      ${this.props.queue.count}
                    </div>`
  }
}
