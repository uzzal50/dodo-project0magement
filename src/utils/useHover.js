export const useHover = (color) => {
  const hoverHandler = (e) => {
    const btn = e.target
    btn.style.backgroundColor = color
  }

  const removeHoverHandler = (e) => {
    const btn = e.target
    btn.style.backgroundColor = '#fff'
  }

  return { hoverHandler, removeHoverHandler }
}
