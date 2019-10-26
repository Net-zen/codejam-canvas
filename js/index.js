const burgerMenu = document.querySelector(".burger_menu");
burgerMenu.addEventListener("click", function() {
  burgerMenu.classList.toggle("burger_menu-active");
});

const canvas = document.getElementById("draw_field--canvas");
const ctx = canvas.getContext("2d");
const sizeSwitcherList = document.querySelector(".size_switcher--list");
sizeSwitcherList.addEventListener("change", evt => {
  if (evt.target.value === "256x256") {
    showImage();
  } else if (evt.target.value === "4x4") {
    getData("../data/4x4.json");
  } else if (evt.target.value === "32x32") {
    getData("../data/32x32.json");
  }
});

function showImage() {
  let img = new Image();
  img.src = "../data/image.png";
  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
}

function getData(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => fillCanvas(data));
}

function fillCanvas(data) {
  canvas.height = data.length;
  canvas.width = data[0].length;
  let flatData = data.flat();
  while (Array.isArray(flatData[0])) {
    flatData = flatData.flat();
  }
  let rgba;
  if (flatData[0].length === 6) {
    rgba = flatData.map(el => [
      parseInt(el.substr(0, 2), 16),
      parseInt(el.substr(2, 2), 16),
      parseInt(el.substr(4, 2), 16),
      255
    ]);
    flatData = rgba.flat();
  }
  const imgData = new ImageData(
    Uint8ClampedArray.from(flatData),
    data.length,
    data[0].length
  );
  ctx.putImageData(imgData, 0, 0);
}

getData("../data/4x4.json");
