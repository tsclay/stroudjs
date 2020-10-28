//= ==========================================================
// DOM Searching
//= ==========================================================

/**
 * A wrapper around ```document.querySelector()```
 *
 * @param {String} element - The element to create
 * @returns {HTMLElement} The NodeList (array-like object) containing the elements that match the given query
 */
const searchForOne = (string) => document.querySelector(string)

/**
 * A wrapper around ```document.querySelectorAll()```
 *
 * @param {String} element - The element to create
 * @returns {NodeList} The HTMLElementCollection returned from ```document.querySelectorAll()```
 */
const searchForAll = (string) => document.querySelectorAll(string)

//= ==========================================================
// Element Composition
//= ==========================================================

/**
 * A wrapper around ```document.createElement()``` with helpers for setting attributes and innerText
 *
 * @param {String} element - The element to create
 * @param {Object} [attributes] - (Optional) Object containing attributes to set: ```element.setAttribute(key, value)```
 * @param {String|Number} attributes.attributeName - The element attribute you wish to set and its value
 * @param {String} [innerText] - (Optional) The innerText to set on the element
 */
const createElement = (tag, attributes = null, innerText = null) => {
  const element = document.createElement(tag)
  if (attributes) {
    const valuePairs = Object.entries(attributes)
    valuePairs.forEach((a) => {
      const [key, value] = a
      element.setAttribute(`${key}`, value)
    })
  }
  if (typeof innerText === 'string') element.innerText = innerText
  return element
}

/**
 * Create SVG elements. A wrapper around ```document.createElementNS()``` with helpers for setting attributes.
 *
 * @param {String} tag - The SVG element to create, such as 'svg', 'path', 'g', so on
 * @param {String} qualifiedName - The tag name for the element
 * @param {Object} [attributes] - (Optional) Object containing attributes to set: ```element.setAttribute(key, value)```
 * @param {String|Number} attributes.attributeName - The element attribute you wish to set and its value
 * @param {Number[]} viewBox - [viewBoxWidth, viewBoxHeight] to set the viewbox
 * @param {Array} [dimensions] - Set a width and height different from viewBox if needed. Can be numbers or strings representing a percentage. If not provided, ```viewBox``` array is used
 */
const createSVG = (tag, attributes, viewBox, dimensions) => {
  const xmlns = 'http://www.w3.org/2000/svg'
  const svgElement = document.createElementNS(xmlns, tag)
  if (tag === 'svg') {
    const [width, height] = viewBox
    svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`)
    if (dimensions) {
      const [diffWidth, diffHeight] = dimensions
      svgElement.setAttribute('width', diffWidth)
      svgElement.setAttribute('height', diffHeight)
    } else {
      svgElement.setAttribute('width', width)
      svgElement.setAttribute('height', height)
    }
  }
  if (attributes) {
    const valuePairs = Object.entries(attributes)
    valuePairs.forEach((a) => {
      const [key, value] = a
      svgElement.setAttribute(`${key}`, value)
    })
  }
  return svgElement
}

/**
 * Append list of elements to a created fragment. Elements will be siblings to each other.
 *
 * This method will provide a performance boost if needing to add multiple elements to the DOM at one time.
 * @param {HTMLElement[]} siblings - List of the Element objects that will go inside ```DocumentFragment```
 * @returns {DocumentFragment} The document fragment with children
 */
const fragmentElements = (siblings) => {
  const frag = document.createDocumentFragment()
  siblings.forEach((s) => {
    frag.appendChild(s)
  })
  return frag
}

/**
 * Append children elements from a list of child elements to a given parent element.
 *
 * @param {HTMLElement} parent - The parent node to which children will be appended
 * @param {HTMLElement[]} children - List children elements that will go inside ```parent```. Appended in ascending order, so first in list will be ```parent.firstChild```
 * @returns {HTMLElement} Parent with children appended
 */
const nestElements = (parent, children) => {
  children.forEach((c) => {
    parent.appendChild(c)
  })
  return parent
}

//= ==========================================================
// DOM Manipulation
//= ==========================================================

/**
 * Callback function to execute after all inputed nodes are removed.
 *
 * @callback callback
 */

/**
 * Helper for for removing child nodes from DOM. This is done iteratively.
 * Pass an optional callback to execute after last node of list is removed.
 *
 * @param {HTMLElement[]} nodes - List of nodes to remove from the DOM.
 * @param {callback} [callback] - (Optional) Callback to run after nodes are removed
 */
const removeNodes = (nodes, callback) => {
  nodes.forEach((n) => {
    const len = nodes.length
    n.remove()
  })
  if (typeof callback === 'function') {
    callback()
  }
}

/**
 * Callback function to execute after all inputed nodes are removed.
 *
 * @callback callback
 */

/**
 * Remove children nodes from a parent while keeping the parent in the DOM.
 * A callback can be called at the end of this event if needed.
 *
 * @param {HTMLElement} parent - Element to empty
 * @param {callback} [callback] - (Optional) Callback to execute upon completion
 */
const empty = (parent, callback) => {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild)
  }
  if (typeof callback === 'function') callback()
}
