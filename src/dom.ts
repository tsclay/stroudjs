import {NodeAttributes} from './interfaces/dom.interfaces'

//= ==========================================================
// DOM Searching
//= ==========================================================

/**
 * A wrapper around ```document.querySelector()```
 *
 * @param {String} query - The element to find, using CSS selector
 * @returns {HTMLElement|null} The NodeList (array-like object) containing the elements that match the given query or null if not found
 */
export const searchForOne = (query: string): HTMLElement | null => document.querySelector(query)

/**
 * A wrapper around ```document.querySelectorAll()```
 *
 * @param {String} query - The element to find, using CSS selector
 * @returns {NodeList|null} The HTMLElementCollection returned from ```document.querySelectorAll()``` or null if not found
 */
export const searchForAll = (query: string): NodeListOf<Element> | null => document.querySelectorAll(query)

//= ==========================================================
// Element Composition
//= ==========================================================

/**
 * A wrapper around ```document.createElement()``` with helpers for setting attributes and innerText
 *
 * @param {String} tagName - The tag name for the element to create
 * @param {Object} [attributes] - (Optional) Object containing attributes to set: ```element.setAttribute(key, value)```
 * @param {String|Number} attributes.attributeName - The element attribute you wish to set and its value
 * @param {String} [innerText] - (Optional) The innerText to set on the element
 * @returns {HTMLElement} The new element
 */
export const createElement = (tagName:string, attributes?: NodeAttributes, innerText?: string): HTMLElement => {
  const element = document.createElement(tagName)
  if (attributes) {
    const valuePairs = Object.entries(attributes)
    valuePairs.forEach((a) => {
      const [key, value] = a
      element.setAttribute(`${key}`, typeof value == 'number' ? `${value}` : value)
    })
  }
  return element
}

/**
 * Create SVG elements. A wrapper around ```document.createElementNS()``` with helpers for setting attributes.
 *
 * @param {String} tagName - The SVG element's tag name to create, such as 'svg', 'path', 'g', so on
 * @param {Object} [attributes] - (Optional) Object containing attributes to set: ```element.setAttribute(key, value)```
 * @param {String|Number} attributes.attributeName - The element attribute you wish to set and its value
 * @param {Number[]} viewBox - [viewBoxWidth, viewBoxHeight] to set the viewbox
 * @param {Array} [dimensions] - Set a width and height different from viewBox if needed. Can be numbers or strings representing a percentage. If not provided, ```viewBox``` array is used
 * @returns {SVGElement} The new SVG element
 */
export const createSVG = (tagName:string, viewBox: [number, number], attributes?: NodeAttributes, dimensions?: [number, number]): SVGElement => {
  const xmlns = 'http://www.w3.org/2000/svg'
  const svgElement = document.createElementNS(xmlns, tagName)
  if (tagName === 'svg') {
    const [width, height] = viewBox
    svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`)
    if (dimensions) {
      const [diffWidth, diffHeight] = dimensions
      svgElement.setAttribute('width', `${diffWidth}`)
      svgElement.setAttribute('height', `${diffHeight}`)
    } else {
      svgElement.setAttribute('width', `${width}`)
      svgElement.setAttribute('height', `${height}`)
    }
  }
  if (attributes) {
    const valuePairs = Object.entries(attributes)
    valuePairs.forEach((a) => {
      const [key, value] = a
      svgElement.setAttribute(`${key}`, typeof value == 'number' ? `${value}` : value)
    })
  }
  return svgElement
}

//= ==========================================================
// Grouping
//= ==========================================================

/**
 * Append list of elements to a created fragment. Elements will be siblings to each other.
 *
 * This method will provide a performance boost if needing to add multiple elements to the DOM at one time.
 * @param {HTMLElement[]} siblings - List of the Element objects that will go inside ```DocumentFragment```
 * @returns {DocumentFragment} The document fragment with children
 */
export const fragmentElements = (siblings: HTMLElement[]): DocumentFragment => {
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
export const nestElements = (parent: HTMLElement, children: HTMLElement[]): HTMLElement => {
  children.forEach((c) => {
    parent.appendChild(c)
  })
  return parent
}

//= ==========================================================
// Removal
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
export const removeNodes = (nodes: HTMLElement[], callback?: () => any) => {
  nodes.forEach((n) => {
    n.remove()
  })
  if (callback) {
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
export const empty = (parent: HTMLElement, callback?: () => any) => {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild)
  }
  if (callback) callback()
}


