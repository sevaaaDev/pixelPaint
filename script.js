const canvasHeight = 500;
const slider = document.querySelector(".size-slider");
const resetBtn = document.querySelector(".btn-reset");
const eraserBtn = document.querySelector(".btn-eraser");
const canvas = document.querySelector("#canvas");
slider.addEventListener("input", changeCanvas);
resetBtn.addEventListener("click", changeCanvas);
// eraserBtn.addEventListener("click", erasePixel);
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
    pixelFlex.style.display = "flex";
    canvas.appendChild(pixelFlex);
    for (let i = 0; i < totalPixelSqrt; i++) {
      const pixel = document.createElement("div");
      setPixelSize(pixelSize, pixelSize);
      function setPixelSize(width, height) {
        pixel.style.width = width;
        pixel.style.height = height;
      }
      pixel.style.backgroundColor = "white";
      pixel.style.border = "1px solid gray";
      pixel.style.boxSizing = "border-box";
      pixelFlex.appendChild(pixel);
    }
  }
  changeColor();
}

function changeColor() {
  const pixel = document.querySelectorAll("#canvas div");
  for (let i = 0; i < pixel.length; i++) {
    pixel[i].addEventListener("click", () => {
      pixel[i].style.backgroundColor = getColor();
    });
  }
}

function getColor() {
  const colorPicker = document.querySelector(".color-picker");
  return colorPicker.value;
}
