import {
  s1,
  sAll,
  createElement,
  createSVG,
  nestElements,
  fragmentElements,
  removeNodes,
  empty,
  transition,
  flip,
  easings,
  STROUD_REGISTERED_RULES,
  STROUD_ANIMATION_COUNTER,
  resetStroudStyles
} from '../../../src/main'

const { linear, circIn } = easings

const resetChildren = () => {
  removeNodes(sAll('.child'), () => {
    resetStroudStyles()
  })
}

const handleExit = (e) => {
  const thisChild = e.currentTarget
  const text = thisChild.textContent

  transition('out', thisChild, {
    duration: 800,
    delay: 0,
    easing: linear,
    css: (t, u) => {
      return `
        transform: translate(${t * 100}px, ${t * 100}px);
        opacity: ${u};
      `
    },
    tick: (t, u) => {
      if (t === 1) {
        thisChild.remove()
      }
    }
  })
}

const handleBox1 = () => {
  const prependBtn = s1('#prepend-btn')
  const appendBtn = s1('#append-btn')
  const resetBtn = s1('#reset')

  const prependChildGracefully = () => {
    const childDiv = createElement(
      'div',
      {
        class: 'child'
      },
      'Click me to go out!'
    )

    childDiv.style.background = `rgb(${Math.random() * 255}, ${
      Math.random() * 255
    }, ${Math.random() * 255})`

    childDiv.addEventListener('click', handleExit)

    s1('.box').prepend(childDiv)
    transition(
      'in',
      childDiv,
      {
        duration: 200,
        delay: 0,
        easing: circIn,
        css: (t, u) => {
          return `
          transform: translateY(${u * 50}px)
          `
        },
        tick: (t, u) => {}
      },
      s1('.box')
    )
  }

  const appendChildGracefully = () => {
    const childDiv = createElement(
      'div',
      {
        class: 'child'
      },
      'Click me to go out!'
    )

    childDiv.style.background = `rgb(${Math.random() * 255}, ${
      Math.random() * 255
    }, ${Math.random() * 255})`

    childDiv.addEventListener('click', handleExit)

    s1('.box').appendChild(childDiv)
    transition('in', childDiv, {
      duration: 300,
      delay: 0,
      easing: linear,
      css: (t, u) => {
        return `transform: translateY(${u * 50}px)`
      },
      tick: (t, u) => {}
    })
  }

  resetBtn.addEventListener('click', resetChildren)
  prependBtn.addEventListener('click', prependChildGracefully)
  appendBtn.addEventListener('click', appendChildGracefully)
}

const handleBox2 = () => {
  const box = sAll('.box')[1]
  const flipAft = s1('#flip-aft')
  const flipPre = s1('#flip-pre')

  const flipAppend = () => {
    const handleFlip = (e) => {
      const thisChild = e.currentTarget
      flip(sAll('.box')[0], 'append', thisChild, () => {
        thisChild.removeEventListener('click', handleFlip)
        thisChild.addEventListener('click', handleExit)
      })
    }
    const childDiv = createElement(
      'div',
      {
        class: 'child'
      },
      'APPEND me to Box 1!'
    )

    childDiv.style.background = `rgb(${0.5 * 255}, ${0.5 * 255}, ${0.5 * 255})`

    childDiv.addEventListener('click', handleFlip)

    box.appendChild(childDiv)
    transition('in', childDiv, {
      duration: 100,
      delay: 0,
      easing: linear,
      css: (t, u) => {
        return `transform: translateY(${u * 50}px)`
      },
      tick: (t, u) => ''
    })
  }

  const flipPrepend = () => {
    const handleFlip = (e) => {
      const thisChild = e.currentTarget
      flip(sAll('.box')[0], 'prepend', thisChild, () => {
        thisChild.removeEventListener('click', handleFlip)
        thisChild.addEventListener('click', handleExit)
      })
    }
    const childDiv = createElement(
      'div',
      {
        class: 'child'
      },
      'PREPEND me to Box 1!'
    )

    childDiv.style.background = `rgb(${0.25 * 255}, ${0.25 * 255}, ${
      0.25 * 255
    })`

    childDiv.addEventListener('click', handleFlip)

    box.prepend(childDiv)
    transition('in', childDiv, {
      duration: 100,
      delay: 0,
      easing: linear,
      css: (t, u) => {
        return `transform: translateY(${u * -50}px)`
      },
      tick: (t, u) => {}
    })
  }

  flipAft.addEventListener('click', flipAppend)
  flipPre.addEventListener('click', flipPrepend)
}

handleBox1()
handleBox2()
