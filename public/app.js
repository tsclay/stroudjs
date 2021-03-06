const toggleMainSideNav = (e) => {
  const navBar = e.currentTarget.parentNode
  navBar.classList.toggle('active')
  if (navBar.classList.contains('active')) {
    e.currentTarget.innerText = 'X'
  } else {
    e.currentTarget.innerText = '>'
  }
}
