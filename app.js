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

  childDiv.style.background = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`

  const handleExit = (e) => {
    const thisChild = e.currentTarget
    const text = thisChild.textContent
    transition('out',thisChild, {
      duration: 2000,
      delay: 0,
      easing: linear,
      css: (t, u) => {
          return`
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

const resetChildren = () => {
  removeNodes(searchForAll('.child'), () => {
    console.log('All children cleared!')
  })
}

resetBtn.addEventListener('click', resetChildren)
transitionBtn.addEventListener('click', addChildGracefully)
