const canvasHeight = 500;
const slider = document.querySelector(".size-slider");
const resetBtn = document.querySelector(".btn-reset");
const borderBtn = document.querySelector(".btn-border");
const canvas = document.querySelector("#canvas");
slider.addEventListener("input", changeCanvas);
resetBtn.addEventListener("click", changeCanvas);
borderBtn.addEventListener('click', toggleBorder)
// TODO
// shift + hover = color white
// random color
// darkening mode 
generatePixel();

function resetCanvas() {
  while (canvas.hasChildNodes()) {
    canvas.removeChild(canvas.firstChild);
  }
}

function changeCanvas() {
  resetCanvas();
  generatePixel();
}

function generatePixel() {
  let totalPixelSqrt = slider.value;
  let pixelSize = canvasHeight / totalPixelSqrt + "px";
  for (let i = 0; i < totalPixelSqrt; i++) {
    const pixelFlex = document.createElement("div");
    pixelFlex.classList.add('divflex')
    pixelFlex.style.display = "flex";
    canvas.appendChild(pixelFlex);
    for (let i = 0; i < totalPixelSqrt; i++) {
      const pixel = document.createElement("div");
      setPixelSize(pixelSize, pixelSize);
      function setPixelSize(width, height) {
        pixel.style.width = width;
        pixel.style.height = height;
      }
      pixel.classList.add('border-on')
      pixel.style.backgroundColor = "white";
      pixel.style.boxSizing = "border-box";
      pixelFlex.appendChild(pixel);
    }
  }
  changeColor();
  changeSliderNum()
}

function changeColor() {
  const pixel = document.querySelectorAll("#canvas .divflex div");
  for (let i = 0; i < pixel.length; i++) {
    pixel[i].addEventListener("mouseover", (e) => {
      if (e.shiftKey === true) {
        pixel[i].style.backgroundColor = 'white';
        return
      }
      pixel[i].style.backgroundColor = getColor();
    });
  }
}

function getColor() {
  const colorPicker = document.querySelector(".color-picker");
  return colorPicker.value;
}

function changeSliderNum() {
  const sliderNum = document.querySelector('.slider p')
  sliderNum.textContent = `${slider.value} x ${slider.value}`
}

function toggleBorder() {
  const pixel = document.querySelectorAll("#canvas .divflex div");
  for (let i = 0; i < pixel.length; i++) {
    pixel[i].classList.toggle('border-on')
  }
}