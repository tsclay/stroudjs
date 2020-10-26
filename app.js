const transitionBtn = searchForOne('#transition-btn')

const resetBtn = searchForOne('#reset')

const addChildGracefully = () => {
  const childDiv = createElement('div', {
    class: 'child'
  }, 'Click me to go out!')

  const handleExit = (e) => {
    const thisChild = e.currentTarget
    transition('out', thisChild, 'bring-in')
  }

  childDiv.addEventListener('click', handleExit)

  transition('in', childDiv, 'bring-in', searchForOne('.box'))
}

const resetChildren = () => {
  removeNodes(searchForAll('.child'), () => {
    console.log('All children cleared!')
  })
}

resetBtn.addEventListener('click', resetChildren)
transitionBtn.addEventListener('click', addChildGracefully)