const size = 500
const width = 4
const pixelSize = (size / width) + 'px'


for (let i = 0; i < width; i++) {
  const canvas = document.querySelector('#canvas')
  const pixelFlex = document.createElement('div')
  pixelFlex.style.display = 'flex'
  canvas.appendChild(pixelFlex)
  for (let i = 0; i < width; i++) {
    const pixel = document.createElement('div')
    setWidth(pixelSize, pixelSize)
    function setWidth(width, height) {
      pixel.style.width = width;
      pixel.style.height = height
    }
    pixel.style.backgroundColor = 'white'
    pixel.style.border = '1px solid black'
    pixel.style.boxSizing = 'border-box'
    pixelFlex.appendChild(pixel)
  }
}