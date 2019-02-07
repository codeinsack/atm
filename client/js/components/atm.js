import Component from './component'

export default class AtmComponent extends Component {
  constructor ({ atm }) {
    super({ atm })
    atm.on('Atm_MakeBusy', this.fn.bind(this))
    atm.on('Atm_MakeFree', this.fn.bind(this))
    this.setTemplate()
    this.element = this.createElement()
  }

  fn () {
    this.setTemplate()
    this.element.innerHTML = this.render(true)
  }

  setTemplate () {
    this.template = `<div class="rect atm ${this.props.atm.isFree ? 'bgc-green' : 'bgc-red'}">
                      ${this.props.atm.count}
                    </div>`
  }
}
