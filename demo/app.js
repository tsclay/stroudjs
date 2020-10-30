const resetChildren = () => {
  removeNodes(searchForAll('.child'), () => {
    console.log('All children cleared!')
  })
  while (active.sheet.cssRules.length > 0) {
    active.sheet.deleteRule(active.sheet.length - 1)
  }
  registeredRules.clear()
}

function handleBox1() {
  const transitionBtn = searchForOne('#transition-btn')
  const resetBtn = searchForOne('#reset')

  const addChildGracefully = () => {
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
            console.log('removed!')
            thisChild.remove()
          }
        }
      })
    }

    childDiv.addEventListener('click', handleExit)

    // searchForOne('.box').appendChild(childDiv)
    searchForOne('.box').prepend(childDiv)
    transition(
      'in',
      childDiv,
      {
        duration: 1000,
        delay: 0,
        easing: linear,
        css: (t, u) => {
          return `transform: translateY(${u * 50}px)`
        },
        tick: (t, u) => {}
      },
      searchForOne('.box')
    )
  }

  resetBtn.addEventListener('click', resetChildren)
  transitionBtn.addEventListener('click', addChildGracefully)
}

function handleBox2() {
  const box = searchForAll('.box')[1]
  const flipBtn = searchForOne('#flip')

  const addChildGracefully = () => {
    const childDiv = createElement(
      'div',
      {
        class: 'child'
      },
      'Send me to Box 1!'
    )

    childDiv.style.background = `rgb(${0.5 * 255}, ${0.5 * 255}, ${0.5 * 255})`

    const handleFlip = (e) => {
      const thisChild = e.currentTarget
      // thisChild.onanimationend = () => {
      //   flip(thisChild, searchForAll('.box')[1])
      // }
      flip(thisChild, searchForAll('.box')[0])
    }

    childDiv.addEventListener('click', handleFlip)

    box.appendChild(childDiv)
    transition('in', childDiv, {
      duration: 100,
      delay: 0,
      easing: linear,
      css: (t, u) => {
        return `transform: translateY(${u * 50}px)`
      },
      tick: (t, u) => {}
    })
  }

  flipBtn.addEventListener('click', addChildGracefully)
}

handleBox1()
handleBox2()
