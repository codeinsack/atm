import QueueComponent from '../components/queue'
import AtmComponent from '../components/atm'
import Component from '../components/component'

export default class HomeRouteComponent extends Component {
  constructor (props) {
    super(props)
    this.queueComponent = new QueueComponent({ queue: this.props.queue })
    this.atmComponents = props.atms.map(atm => {
      return new AtmComponent({ atm: atm })
    })
    this.setTemplate()
    this.element = this.createElement()
    document.body.appendChild(this.element)
  }

  setTemplate () {
    this.template = `<div class="container">
                      <div class="container__left">
                        {{{this.queueComponent}}}
                        {{{this.atmComponents}}}
                      </div>
                      <div class="container__right"></div>
                    </div>`
  }
}
