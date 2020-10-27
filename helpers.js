/* eslint-disable no-self-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
// const htmlToElements = (htmlString) => {
//   const template = document.createElement('template')
//   htmlString.trim()
//   template.innerHTML = htmlString
//   template.innerHTML.trim()
//   return template.content.childNodes
// }

// const htmlToElement = (htmlString) => {
//   const template = document.createElement('template')
//   htmlString.trim()
//   template.innerHTML = htmlString
//   template.innerHTML.trim()
//   return template.content.firstChild
// }
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

//= ==========================================================
// CSS Transition & Animation
//= ==========================================================

/**
 * Move one element from one parent to another using an animation to show
 * the action.
 *
 * @param {HTMLElement} node - The node to animate. This only affects the node's insertion into the DOM.
 * @param {Object} props - Other CSS props to animate; translate is handled, but can add extra translates if needed
 * @param {Object} classOptions - The class name and whether to add or remove it
 * @param {HTMLElement} parent - The parent to which the animated node will be appended
 */
// const animateTo = (node, props, classOptions, parent) => {
//   const style = getComputedStyle(node)
//   console.log(style.transform)
//   const transform = style.transform === '' ? 'none' : style.transform
//   const from = node.getBoundingClientRect()
//   const to = parent.getBoundingClientRect()
//   let correctiveX = 0
//   let correctiveY = 0
//   if (parent.lastElementChild && classOptions.change === 'add') {
//     const lastChild = parent.lastElementChild.getBoundingClientRect()
//     correctiveX = lastChild.left + lastChild.width
//   }
//   if (parent.lastElementChild && classOptions.change === 'remove') {
//     const lastChild = parent.lastElementChild.getBoundingClientRect()
//     correctiveY = 50 * parent.children.length - 1
//   }

//   const player = node.animate(
//     [
//       {
//         transform: `${transform} translate(${-1.0 * dx + correctiveX}px,${
//           -1.0 * dy + correctiveY
//         }px)`,
//         ...props
//       }
//     ],
//     {
//       duration: 200,
//       easing: 'linear',
//       composite: 'replace'
//     }
//   )

//   const swapParents = (e) => {
//     parent.appendChild(node)
//     if (classOptions.change === 'add') {
//       node.classList.add(classOptions.className)
//       node.style.transform = `translate(${correctiveX}px, 0px)`
//     } else if (classOptions.change === 'remove') {
//       node.classList.remove(classOptions.className)
//       node.style.transform = ''
//       node.style.overflow = 'visible'
//       node.style.transform = `translate(-3.37px, ${
//         50 * (parent.children.length - 1)
//       }px)`
//     }
//     console.log('all done')
//     player.removeEventListener('finish', swapParents, true)
//   }

//   player.addEventListener('finish', swapParents, true)
// }

/**
 * Using an animation defined in CSS, give a node a cool entrance.
 * Animation must be defined using ```@keyframes```
 *
 * @param {HTMLElement} node - The node to animate. This only affects the node's insertion into the DOM.
 * @param {String} animator - The class name that references the ```@keyframe``` animation (i.e. a fade-in or slide-in animation)
 * @param {HTMLElement} parent - The parent to which the animated node will be appended
 */
const animateIn = (node, animator, parent) => {
  const removeAnimator = () => {
    node.classList.remove(animator)
    node.removeEventListener('animationend', removeAnimator)
  }
  node.addEventListener('animationend', removeAnimator)
  node.classList.add(animator)
  parent.appendChild(node)
}

/**
 * Using an animation defined in CSS, give a node a grand exit.
 * Animation must be defined using ```@keyframes```
 *
 * Note that this function will use ```node.remove()``` instead of ```someParent.removeChild(node)```
 *
 * @param {HTMLElement} node - The node to animate. This only affects the node's removal from the DOM.
 * @param {String} animator - The class name that references the ```@keyframe``` animation (i.e. a custom fade-out or slide-out animation)
 */
const animateOut = (node, animator) => {
  const removeAnimator = () => {
    node.remove()
    node.classList.remove(animator)
    node.removeEventListener('animationend', removeAnimator)
  }
  node.classList.add(animator)
  node.addEventListener('animationend', removeAnimator)
}

//= ==========================================================
// Transition
//= ==========================================================
/**
 * Transition an element in or out of the DOM gracefully.
 *
 * @param {String} direction - Pass ```in``` or ```out```
 * @param {HTMLElement} node - The node needing to transition
 * @param {String} transitionClass - The class name to toggle
 * @param {HTMLElement} [parent] - (Optional) The parent to which node would be appended if ```direction = 'in'```
 */
const transition = (direction, node, transitionClass, parent) => {
 
  /**
   * Append an element to a parent container, attach a class name for its entrance transition, and trigger it to execute by calculating its ```offsetWidth```.
   *
   * If needing to remove the node afterwards, use ```transitionOut()```
   *
   * When paired with ```transitionOut```,
   *
   * @param {HTMLElement} n - The node needing the transition class
   * @param {String} t - The class name that references the entrance transition
   * @param {HTMLElement} p - The parent node to which the node is appended
   */
  const enter = (n, t, p) => {
    if (p.lastChild === n) {
      n.offsetWidth = n.offsetWidth
      n.classList.add(t)
      return
    }
    p.appendChild(n)
    n.offsetWidth = n.offsetWidth
    n.classList.add(t)
  }

  /**
   * Remove transition class from element to trigger it to return to the state it was when it first entered the DOM.
   *
   * The node is removed from the DOM when its transition end. A callback then cleans up the event listener, avoiding memory leaks.
   *
   * It is best to use this in conjunction with ```transitionIn()```
   *
   * @param {HTMLElement} n - The node needing the transition class removed
   * @param {String} t - The class name that references the entrance transition used for this node
   */
  const exit = (n, t) => {
    n.classList.add(t)
    n.ontransitionend = () => {
      n.remove()
    }
  }

  let output = null
  if (!direction)
    return new Error(
      'direction missing, not a string, or not eqaual to "in" or "out"'
    )
  if (direction.toLowerCase() === 'in' && !parent) {
    return new Error(
      'parent node must be included when transitioning an element in'
    )
  }

  
  if (direction.toLowerCase() === 'in' && parent) {
    enter(node, transitionClass, parent)
    output = 'in'
    return output
  }
  exit(node, transitionClass)
  output = 'out'
  return output
}
