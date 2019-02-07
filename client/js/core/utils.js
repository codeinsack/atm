export function formatDate (date) {
  const MONTHS = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December'
  ]
  const day = date.getDate()
  const monthIndex = date.getMonth()
  const year = date.getFullYear()
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return `${day} ${MONTHS[monthIndex]} ${year}, ${hours}:${minutes}:${seconds}`
}

export function randomInteger (min, max) {
  const rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

export function createHtmlElement (htmlString) {
  const [ , openTag, content ] = /<(.*?|(?:.*?\n)+.*?)>(.*?|(?:.*?\n)+.*?)<\/.+?>/.exec(htmlString)
  const tagName = /\w+/.exec(openTag)
  const element = document.createElement(tagName)
  const reParams = /([\w|-]+)="(.*?|(?:.*?\n?)+.*?)"/g
  let reParamsExecResult
  while ((reParamsExecResult = reParams.exec(openTag))) {
    element.setAttribute(reParamsExecResult[1], reParamsExecResult[2])
  }
  element.innerHTML = content.trim()
  return element
}
