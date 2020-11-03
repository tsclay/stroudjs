const resetChildren = () => {
  removeNodes(searchForAll('.child'), () => {})
  while (active.sheet.cssRules.length > 0) {
    active.sheet.deleteRule(active.sheet.length - 1)
  }
  registeredRules.clear()
}

const handleExit = (e) => {
  const thisChild = e.currentTarget
  const text = thisChild.textContent

  transition('out', thisChild, {
    duration: 300,
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
  const prependBtn = searchForOne('#prepend-btn')
  const appendBtn = searchForOne('#append-btn')
  const resetBtn = searchForOne('#reset')

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

    searchForOne('.box').prepend(childDiv)
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
      searchForOne('.box')
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

    searchForOne('.box').appendChild(childDiv)
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
  const box = searchForAll('.box')[1]
  const flipAft = searchForOne('#flip-aft')
  const flipPre = searchForOne('#flip-pre')

  const flipAppend = () => {
    const handleFlip = (e) => {
      const thisChild = e.currentTarget
      flip(searchForAll('.box')[0], 'append', thisChild, () => {
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
      flip(searchForAll('.box')[0], 'prepend', thisChild, () => {
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
