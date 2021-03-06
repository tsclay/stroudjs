/* eslint-disable no-bitwise */
/* eslint-disable no-self-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
//= ==========================================================
// Utilities
//= ==========================================================

// https://github.com/darkskyapp/string-hash/blob/master/index.js
const hash = (str) => {
  let hash = 5381
  let i = str.length

  while (i--) hash = ((hash << 5) - hash) ^ str.charCodeAt(i)
  return hash >>> 0
}

//= ==========================================================
// CSS Transition & Animation
//= ==========================================================

//= ==========================================================
// Transition
//= ==========================================================

const active = document.createElement('style')
document.head.appendChild(active)

const registeredRules = new Set()

let i = 0

/**
 *
 * @param {String} flag Assign 'in' or 'out' depending on whether your element is entering or exiting the DOM
 * @param {HTMLElement} node The element that is entering or exiting the DOM
 * @param {Object} params The parameters object for the CSS or JS animation
 * @param {Number} params.duration Animation duration in ms
 * @param {Number} params.delay Animation delay in ms
 * @param {Function} params.easing The easing function to use for the animation
 * @param {Function} params.css The CSS function that returns a string representing the CSS for the animation
 * @param {Function} params.tick The function that performs a transformation on the node using JS on every ```requestAnimationFrame```
 */
function transition(
  flag,
  node,
  params = {
    duration: 300,
    delay: 0,
    easing: linear,
    css: (t, u) => `transform: translate(-${t * 50}px, ${t * 50}px)`,
    tick: (t, u) => (t === 1 ? (node.style.animation = '') : '')
  }
) {
  const { duration, delay, easing, css, tick } = params
  const name = `stroud_${hash(`${(i += 1)}`)}`
  const keyframes = Math.ceil(duration / 16.66)
  const style = getComputedStyle(node)
  const transform = style.transform === 'none' ? '' : style.transform

  if (flag === 'out') {
    node.dataset.animation = 'out'
    node.formerPos = node.getBoundingClientRect()
    unshiftSiblings(node, { duration, delay, easing })
    node.style.position = 'absolute'
    node.style.top = `${node.formerPos.top + window.scrollY}px`
    node.style.left = `${node.formerPos.left + window.scrollX}px`
  } else if (flag === 'in' || flag === 'flip') {
    pushSiblings(node, { duration, delay, easing })
  }

  const rules = `
  @keyframes ${name} {
    ${Array(keyframes)
      .fill(null)
      .map((_, index) => {
        const t = index / keyframes
        const eased_t = easing(t)
        return `${t * 100}% { ${transform} ${css(eased_t, 1 - eased_t)} }`
      })
      .join('\n')}
    100% { ${css(1, 0)} }
  }
  `

  active.sheet.insertRule(rules, active.sheet.rules.length)
  registeredRules.add(name)

  node.style.animation = `${name} ${duration}ms linear ${delay}ms 1 both`

  if (flag === 'in' || flag === 'out') {
    node.onanimationend = () => {
      const newPos = node.getBoundingClientRect()
      node.style.top = `${newPos.top + parseFloat(`${window.scrollY}.00`)}px`
      node.style.left = `${newPos.left + parseFloat(`${window.scrollX}.00`)}px`
      node.style.animation = ''
      node.style.position = ''
      node.style.top = ''
      node.style.left = ''
      node.style.animation = ''

      active.sheet.removeRule(0)
      registeredRules.clear()
    }
  } else if (flag === 'fill') {
    node.onanimationend = () => {
      node.style.animation = ''
      node.style.position = ''
      node.style.top = ''
      node.style.left = ''

      active.sheet.removeRule(0)
      registeredRules.clear()
    }
  }

  // JS transition if any
  const start = Date.now()
  const end = start + duration
  tick(0, 1)

  const loop = () => {
    const now = Date.now()
    if (now > end) {
      tick(1, 0)
      return
    }

    const t = (now - start) / duration
    const eased_t = t

    tick(eased_t, 1 - eased_t)
    requestAnimationFrame(loop)
  }
  requestAnimationFrame(loop)
}

function unshiftSiblings(node, params) {
  const next = node.nextElementSibling ? node.nextElementSibling : null

  if (!next) return

  const stack = [...node.parentElement.children]
  // console.log(stack)
  let offset = 0

  const { duration = 300, delay = 0, easing = linear } = params

  for (let j = stack.length - 1; j >= 0; j--) {
    stack[j].formerPosition = stack[j].formerPosition
      ? stack[j].formerPosition
      : stack[j].getBoundingClientRect()
    if (
      stack[j].style.position !== 'absolute' &&
      stack[j].dataset.animation !== 'flip'
    ) {
      stack[j].style.position = 'absolute'
      stack[j].style.top = `${stack[j].formerPosition.top + window.scrollY}px`
      stack[j].style.left = `${stack[j].formerPosition.left + window.scrollX}px`
    }
  }

  for (let j = 0; j < stack.length; j++) {
    if (
      stack[j].dataset.animation === 'out' ||
      stack[j].dataset.animation === 'flip'
    ) {
      offset += 1
      continue
    }
    const currentRect = stack[j].getBoundingClientRect()
    stack[j].style.position = 'absolute'
    stack[j].style.top = `${currentRect.top + window.scrollY}px`
    stack[j].style.left = `${currentRect.left + window.scrollX}px`
    const prevFill = stack[j - offset].formerPosition
    const dx = prevFill.left - currentRect.left
    const dy = prevFill.top - currentRect.top
    const style = getComputedStyle(stack[j])
    const transform = style.transform === 'none' ? '' : style.transform

    transition('fill', stack[j], {
      duration,
      delay,
      easing,
      css: (t, u) => {
        return `transform: translate(${dx * t}px, ${dy * t}px)`
      },
      tick: (t, u) => {
        if (t === 1) {
          stack[j].formerPosition = ''
        }
      }
    })
  }
}

function pushSiblings(node, params) {
  let next = node.nextElementSibling ? node.nextElementSibling : null

  if (!next) return

  const stack = []
  const { duration = 300, delay = 0, easing = linear } = params

  while (next) {
    stack.push(next)
    next = next.nextElementSibling
  }

  for (let j = stack.length - 1; j >= 0; j -= 1) {
    const currentRect = stack[j].getBoundingClientRect()
    stack[j].style.position = 'absolute'
    stack[j].style.top = `${currentRect.top + window.scrollY}px`
    stack[j].style.left = `${currentRect.left + window.scrollX}px`

    const prevFill = stack[j - 1]
      ? stack[j - 1].getBoundingClientRect()
      : currentRect
    const dx =
      currentRect === prevFill
        ? currentRect.width * -1.0
        : prevFill.left - currentRect.left
    const dy = prevFill.top - currentRect.top

    const style = getComputedStyle(stack[j])
    const transform = style.transform === 'none' ? '' : style.transform
    transition('fill', stack[j], {
      duration,
      delay,
      easing,
      css: (t, u) => {
        return `transform: ${transform} translate(${dx * u}px, ${dy * u}px)`
      },
      tick: (t, u) => ''
    })
  }
}

/**
 * Animate a node's transfer to another element in the DOM.
 *
 * @param {HTMLElement} target The parent node taking in the new element
 * @param {String} flag Either 'append', which will call ```target.appendChild(node)``` or 'prepend' which calls ```target.prepend(node)```
 * @param {HTMLElement} node The node being moved to ```target```
 * @param {Function} [callback] Execute code when flip has completed
 */
function flip(target, flag, node, callback) {
  const rA = node.getBoundingClientRect()
  node.formerPosition = rA
  node.dataset.animation = 'flip'
  unshiftSiblings(node, { duration: 300, delay: 0, easing: linear })
  if (flag === 'append') {
    target.appendChild(node)
  } else if (flag === 'prepend') {
    target.prepend(node)
  }

  const rB = node.getBoundingClientRect()

  // console.log(rA.left - rB.left, rA.top - rB.top)

  transition('flip', node, {
    duration: 300,
    delay: 0,
    easing: linear,
    css: (t, u) => {
      return `transform: translate(${(rA.left - rB.left) * u}px, ${
        (rA.top - rB.top) * u
      }px)`
    },
    tick: (t, u) => {
      if (t === 1) {
        node.dataset.animation = ''
        node.formerPosition = ''
      }
      if (t === 1 && callback) {
        callback()
      }
    }
  })
}
