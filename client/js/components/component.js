/* eslint-disable no-eval */
import EventEmitter from '../core/eventEmitter'
import { createHtmlElement } from '../core/utils'

export default class Component extends EventEmitter {
  constructor (props) {
    super()
    this.props = props
    this.template = ''
  }

  createElement () {
    return createHtmlElement(this.render())
  }

  render (isChange = false) {
    let temp = this.template
    if (isChange) {
      let [ , , content ] = /<(.*?|(?:.*?\n)+.*?)>(.*?|(?:.*?\n)+.*?)<\/.+?>/.exec(temp)
      temp = content
    }
    const components = this.template.match(/\{\{\{(.+)\}\}\}/g)
    if (!components) {
      return temp
    }
    components.forEach(component => {
      const parsedComponent = component.slice(3, -3)
      const c = eval(parsedComponent)
      if (!Array.isArray(c)) {
        temp = temp.replace(component, c.render())
      } else {
        var tempRender = ''
        c.forEach(el => {
          tempRender += el.render()
        })
        temp = temp.replace(component, tempRender)
      }
    })
    return temp
  }
}
