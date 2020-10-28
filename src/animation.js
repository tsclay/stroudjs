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

const fix_position = (node) => {
  const style = getComputedStyle(node)

  if (style.position !== 'absolute' && style.position !== 'fixed') {
    const { width, height } = style
    const a = node.getBoundingClientRect()
    node.formerPosition = node.style.position
    node.style.position = 'absolute'
    node.style.width = width
    node.style.height = height
    add_transform(node, a)
  }
}

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

const add_transform = (node, a) => {
  const b = node.getBoundingClientRect()

  if (a.left !== b.left || a.top !== b.top) {
    const style = getComputedStyle(node)
    const transform = style.transform === 'none' ? '' : style.transform

    node.style.transform = `${transform} translate(${a.left - b.left}px, ${
      a.top - b.top
    }px)`
  }
}

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

let i = 0

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

  node.onanimationend = () => {
    node.style.animation = ''
    console.log('animate end!')
    active.sheet.removeRule([...registeredRules].indexOf(name))
    registeredRules.delete(name)
  }

  /*
    Capture rect of exiting element
    Set absolute position on exiting element
    Set nextElementSibling's translate to +rect.left and +rect.top
    Activate exiting element's transition out
    Activate nextElementSibling slide over
  */

  let next = node.nextElementSibling ? node.nextElementSibling : null
  const stack = []
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
