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

  const handleExit = (e) => {
    const thisChild = e.currentTarget
    const text = thisChild.textContent
    transition(thisChild, {
      duration: 800,
      delay: 0,
      easing: linear,
      css: (t, u) => '',
      tick: (t, u) => {
        if (t === 1) {
          thisChild.remove()
        } else {
          thisChild.textContent = text.slice(
            0,
            Math.round(text.length * (1 - t))
          )
        }
      }
    })
  }

  childDiv.addEventListener('click', handleExit)

  searchForOne('.box').appendChild(childDiv)
  transition(childDiv, {
    duration: 300,
    delay: 0,
    easing: linear,
    css: (t, u) => {
      return `transform: translateY(${u * 50}px)`
    },
    tick: (t, u) => {}
  })
}

const resetChildren = () => {
  removeNodes(searchForAll('.child'), () => {
    console.log('All children cleared!')
  })
}

resetBtn.addEventListener('click', resetChildren)
transitionBtn.addEventListener('click', addChildGracefully)
