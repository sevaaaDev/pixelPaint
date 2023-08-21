const slider = document.querySelector(".size-slider");
const resetBtn = document.querySelector(".btn-reset");
const borderBtn = document.querySelector(".btn-border");
const canvas = document.querySelector("#canvas");
const btnMode = document.querySelectorAll(".btn-mode");
let paintMode = "color";
slider.addEventListener("input", changeCanvas);
resetBtn.addEventListener("click", changeCanvas);
borderBtn.addEventListener("click", toggleBorder);
window.addEventListener("load", changeCanvas);
const resizeObserver = new ResizeObserver(resizeCanvas);
resizeObserver.observe(canvas);

for (let mode of btnMode) {
  mode.addEventListener("click", () => {
    if (paintMode === mode.getAttribute("data-mode")) {
      paintMode = "color";
    } else {
      paintMode = mode.getAttribute("data-mode");
    }
  });
}

function resizeCanvas(entries) {
  changeCanvas(entries[0].contentRect.width);
}

function resetCanvas() {
  while (canvas.hasChildNodes()) canvas.removeChild(canvas.firstChild);
}

function changeCanvas(canvasHeight) {
  resetCanvas();
  generatePixel(canvasHeight);
  eraserMode();
  rainbowMode();
  darkenMode();
}

function generatePixel(canvasHeight) {
  let totalPixelSqrt = slider.value;
  let pixelSize = canvasHeight / totalPixelSqrt + "px";
  for (let i = 0; i < totalPixelSqrt; i++) {
    const pixelFlex = document.createElement("div");
    pixelFlex.classList.add("divflex");
    pixelFlex.style.display = "flex";
    canvas.appendChild(pixelFlex);
    for (let i = 0; i < totalPixelSqrt; i++) {
      const pixel = document.createElement("div");
      setPixelSize(pixel, pixelSize, pixelSize);
      pixel.classList.add("border-on");
      pixel.style.backgroundColor = "white";
      pixel.style.boxSizing = "border-box";
      pixelFlex.appendChild(pixel);
    }
  }
  changeColor();
  changeSliderNum();
}

function setPixelSize(element, width, height) {
  element.style.width = width;
  element.style.height = height;
}

function changeColor() {
  const pixel = document.querySelectorAll("#canvas .divflex div");
  for (let px of pixel) {
    px.addEventListener("mouseover", () => {
      if (paintMode !== "color") return;
      px.style.backgroundColor = getColor();
    });
  }
}

function getColor() {
  const colorPicker = document.querySelector(".color-picker");
  return colorPicker.value;
}

function eraserMode() {
  const pixel = document.querySelectorAll("#canvas .divflex div");
  for (let px of pixel) {
    px.addEventListener("mouseover", () => {
      if (paintMode !== "eraser") return;
      px.style.backgroundColor = "white";
    });
  }
}

function rainbowMode() {
  const pixel = document.querySelectorAll("#canvas .divflex div");
  for (let px of pixel) {
    px.addEventListener("mouseover", () => {
      if (paintMode !== "rainbow") return;
      px.style.backgroundColor = getRandomColor();
    });
  }
}

function getRandomColor() {
  return `rgb(
  ${Math.floor(Math.random() * 255)},
  ${Math.floor(Math.random() * 255)},
  ${Math.floor(Math.random() * 255)}
  )`;
}

function darkenMode() {
  const pixel = document.querySelectorAll("#canvas .divflex div");
  for (let px of pixel) {
    px.addEventListener("mouseover", () => {
      if (paintMode !== "darkening") return;
      const compStyle = window.getComputedStyle(px);
      const colorValueRGB = compStyle.getPropertyValue("background-color");
      const colorArr = colorValueRGB
        .substring(4, colorValueRGB.length - 1)
        .replace(/ /g, "")
        .split(",");
      px.style.backgroundColor = `rgb(
        ${colorArr[0] - 25.5},
        ${colorArr[1] - 25.5},
        ${colorArr[2] - 25.5}
      )`;
    });
  }
}

function changeSliderNum() {
  const sliderNum = document.querySelector(".slider p");
  sliderNum.textContent = `${slider.value} x ${slider.value}`;
}

function toggleBorder() {
  const pixel = document.querySelectorAll("#canvas .divflex div");
  for (let px of pixel) {
    px.classList.toggle("border-on");
  }
}
