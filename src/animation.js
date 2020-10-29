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

// const fix_position = (node) => {
//   const style = getComputedStyle(node)

//   if (style.position !== 'absolute' && style.position !== 'fixed') {
//     const { width, height } = style
//     const a = node.getBoundingClientRect()
//     node.formerPosition = node.style.position
//     node.style.position = 'absolute'
//     node.style.width = width
//     node.style.height = height
//     add_transform(node, a)
//   }
// }

// const add_transform = (node, a) => {
//   const b = node.getBoundingClientRect()

//   if (a.left !== b.left || a.top !== b.top) {
//     const style = getComputedStyle(node)
//     const transform = style.transform === 'none' ? '' : style.transform

//     node.style.transform = `${transform} translate(${a.left - b.left}px, ${
//       a.top - b.top
//     }px)`
//   }
// }

// const absolute = (node) => {
//   const style = getComputedStyle(node)

//   if (style.position === 'absolute' || style.position === 'fixed') return

//   const relRect = node.getBoundingClientRect()

//   node.style.position = 'absolute'
//   node.style.width = relRect.width
//   node.style.height = relRect.height
//   node.style.top = `${relRect.top}px`
//   node.style.left = `${relRect.left}px`
// }

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
const transition = (
  flag,
  node,
  params = {
    duration: 300,
    delay: 0,
    easing: linear,
    css: (t, u) => `transform: translate(-${t * 50}px, ${t * 50}px)`,
    tick: (t, u) => (t === 1 ? (node.style.animation = '') : '')
  }
) => {
  const { duration, delay, easing, css, tick } = params
  const name = `stroud_${hash(`${(i += 1)}`)}`
  const keyframes = Math.ceil(duration / 16.66)
  const style = getComputedStyle(node)
  const transform = style.transform === 'none' ? '' : style.transform

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

  active.sheet.insertRule(rules, active.sheet.cssRules.length)
  registeredRules.add(name)

  node.style.animation = `${name} ${duration}ms linear ${delay}ms 1 both`

  if (flag === 'in') {
    node.onanimationend = () => {
      node.style.animation = ''
      console.log('animate end!')
      active.sheet.removeRule([...registeredRules].indexOf(name))
      registeredRules.delete(name)
    }
  } else if (flag === 'fill') {
    node.onanimationend = () => {
      const newPos = node.getBoundingClientRect()
      node.style.top = `${newPos.top + parseFloat(`${window.scrollY}.00`)}px`
      node.style.left = `${newPos.left + parseFloat(`${window.scrollX}.00`)}px`
      node.style.animation = ''
      node.style.position = ''
      node.style.top = ''
      node.style.left = ''
      console.log('animate end!')
      active.sheet.removeRule([...registeredRules].indexOf(name))
      registeredRules.delete(name)
    }
  }

  /*
    For exiting elements, look for next siblings and have them gracefully fill in the void left by exiting element
  */
  const stack = []
  if (flag === 'out') {
    let next = node.nextElementSibling ? node.nextElementSibling : null
    console.log(next)

    while (next) {
      stack.push(next)
      next = next.nextElementSibling
    }

    for (let j = stack.length - 1; j >= 0; j -= 1) {
      const currentRect = stack[j].getBoundingClientRect()
      stack[j].style.position = 'absolute'
      stack[j].style.top = `${currentRect.top + window.scrollY}px`
      stack[j].style.left = `${currentRect.left + window.scrollX}px`
    }
  }

  for (let j = stack.length - 1; j >= 0; j -= 1) {
    const currentRect = stack[j].getBoundingClientRect()
    const prevFill = stack[j - 1]
      ? stack[j - 1].getBoundingClientRect()
      : node.getBoundingClientRect()
    transition('fill', stack[j], {
      duration,
      delay,
      easing: linear,
      css: (t, u) => {
        return `transform: translate(${
          (prevFill.left - currentRect.left) * t
        }px, ${(prevFill.top - currentRect.top) * t}px)`
      },
      tick: (t, u) => ''
    })
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

const flip = (node, target) => {
  // get node rect
  // make node absolute pos
  // get node rect at absolute pos
  // add animation using node current coords
  // append node to target
  // destroy node at old pos
  // const rA = node.getBoundingClientRect()
  // node.style.position = 'absolute'
  // node.style.top = `${rA.top + window.scrollY}px`
  // node.style.left = `${rA.left + window.scrollX}px`
  // target.appendChild(node)
  // const rB = node.getBoundingClientRect()
  // console.log(rA, rB)

  const stack = []
  let next = node.nextElementSibling ? node.nextElementSibling : null
  console.log(next)

  while (next) {
    stack.push(next)
    next = next.nextElementSibling
  }

  for (let j = stack.length - 1; j >= 0; j -= 1) {
    const currentRect = stack[j].getBoundingClientRect()
    stack[j].style.position = 'absolute'
    stack[j].style.top = `${currentRect.top + window.scrollY}px`
    stack[j].style.left = `${currentRect.left + window.scrollX}px`
  }

  for (let j = stack.length - 1; j >= 0; j -= 1) {
    const currentRect = stack[j].getBoundingClientRect()
    const prevFill = stack[j - 1]
      ? stack[j - 1].getBoundingClientRect()
      : node.getBoundingClientRect()
    const dx = prevFill.left - currentRect.left
    const dy = prevFill.top - currentRect.top
    const style = getComputedStyle(stack[j])
    const transform = style.transform === "none" ? '' : style.transform
    transition('fill', stack[j], {
      duration: 300,
      delay: 0,
      easing: linear,
      css: (t, u) => {
        return `transform: ${transform} translate(${
          (dx) * t
        }px, ${(dy) * t}px)`
      },
      tick: (t, u) => ''
    })
  }

  const rA = node.getBoundingClientRect()
  target.appendChild(node)
  const rB = node.getBoundingClientRect()

  transition('flip', node, {
    duration: 300,
    delay: 0,
    easing: linear,
    css: (t, u) => {
      return `transform: translate(${(rA.left - rB.left) * u}px, ${
        (rA.top - rB.top) * u
      }px)`
    },
    tick: (t, u) => ''
  })
}
