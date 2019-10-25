const burgerMenu = document.querySelector('.burger_menu');
burgerMenu.addEventListener('click', function(){
  burgerMenu.classList.toggle('burger_menu-active');
})

const canvas = document.getElementById('draw_field--canvas');
const ctx = canvas.getContext('2d');
const sizeSwitcherList = document.querySelector('.size_switcher--list');
sizeSwitcherList.addEventListener('change', (evt) => {
  if (evt.target.value === '256x256') {
    showImage();
  } else if (evt.target.value === '4x4'){
    getData('../data/4x4.json')
  } else if (evt.target.value === '32x32'){
    getData('../data/32x32.json')
  }
})

function showImage(){
  let img = new Image();
  img.src = '../data/image.png';
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }
}

function getData(url) {
  fetch(url)
      .then(res => res.json())
      .then(data => fillCanvas(data))
}

function fillCanvas (data) {
    canvas.height = data.length;
    canvas.width = data[0].length;
    data.forEach((element, i) => {
      element.forEach((el, j) => {
        if (el.length === 4) {
          let alpha = (el[3] / 265).toFixed(3);
          ctx.fillStyle = 'rgba('+el[0]+','+el[1]+','+el[2]+','+alpha+')';
          ctx.fillRect(i, j, 1, 1);

        } else {
          ctx.fillStyle = '#' + el;
          ctx.fillRect(i, j, 1, 1);
        }
      })
      
    });
}

getData('../data/4x4.json');