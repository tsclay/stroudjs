# stroudjs

A slim library of helper functions for use in vanilla JS projects

## About

Writing this set of helper functions came about as result of building a custom CMS using Python and Javascript. I had made the conscious decision to not use any framework or library, mainly to practice manipulating the DOM only using code I write.

When I think of writing front-end code without a framework or library like React, I compare it to surviving in the wilderness with only a small set of tools given at the outset. These helper functions are such tools. 

## DOM Helpers

### Find things using CSS selectors

Writing ```document.querySelector()``` or ```document.getElementById()``` grows tedious.

```javascript
const searchForOne = (string) => document.querySelector(string)
const searchForAll = (string) => document.querySelectorAll(string)
```

### `createElement()`

- `element` - The element to create
- `attributes` - Object containing attributes to set: ```element.setAttribute(key, value)```
  - `{class: 'foo', "data-id": 'bar'}`
- `innerText` - The innerText to set on the element

```javascript
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
```

An example, if you're familiar with ExtJs then this may look familiar:

```javascript
 const childDiv = createElement(
      'div',
      {
        class: 'child'
      },
      'Click me to go out!'
    )
```

### `createSVG()`

A wrapper around ```document.createElementNS()``` with helpers for setting attributes.

- `tag` - The SVG element to create, such as 'svg', 'path', 'g', so on
- `attributes` - (Optional) Object containing attributes to set: ```element.setAttribute(key, value)```
attributes.attributeName - The element attribute you wish to set and its value
- `viewBox` - Array containing width and height as integers to set for the viewbox
- `dimensions` - Set a width and height different from viewBox if needed. Can be numbers or strings representing a percentage. If not provided, ```viewBox``` array is used

```javascript
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
```

### `nestElements()`

Append elements to a given parent element.

- `parent` - The parent node to which children will be appended
- `children` - Array of children elements that will go inside ```parent```
  
```javascript
const nestElements = (parent, children) => {
  children.forEach((c) => {
    parent.appendChild(c)
  })
  return parent
}
```

### `removeNodes()`

Iteratively remove nodes from the DOM.

- `nodes` - Array of nodes to remove from the DOM.
- `callback` - Optional callback to perform when done

```javascript
const removeNodes = (nodes, callback) => {
  nodes.forEach((n) => {
    n.remove()
  })
  if (typeof callback === 'function') {
    callback()
  }
}
```

### `empty()`

Remove children nodes from a parent node. Useful for nodes whose content is populated by ```fetch()``` results.
A callback can be called at the end of this event if needed.

```javascript
const empty = (parent, callback) => {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild)
  }
  if (typeof callback === 'function') callback()
}
```

## Animation Helpers

### transition()

