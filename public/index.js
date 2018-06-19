const size = 800;

const sandPile = Array(size).fill(0).map((_, y) => {
  return Array(size).fill().map((_, x)=>{
    return new cell().coord(x, y)
  });
});

const canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

let colors = [
  '#fff',
  '#939ac4',
  '#525c95',
  '#040f55',
  '#000'
];

let sizeFactor = 1;
let cellsToRender = {}
function cell() {
  this.value = 0;
  this.x = 0;
  this.y = 0;
  this.update = function(nb) {
    this.value+=nb || 1;
    if (this.value >= 4) {
      this.value -= 4;
      sandPile[this.y][this.x + 1].update(1)
      sandPile[this.y][this.x - 1].update(1);
      sandPile[this.y + 1][this.x].update(1);
      sandPile[this.y - 1][this.x].update(1);
      cellsToRender[this.y + '-' + this.x + 1] = sandPile[this.y][this.x + 1]
      cellsToRender[this.y + '-' + this.x - 1] = sandPile[this.y][this.x - 1]
      cellsToRender[this.y + 1 + '-' + this.x] = sandPile[this.y + 1][this.x]
      cellsToRender[this.y - 1 + '-' + this.x] = sandPile[this.y - 1][this.x]
      cellsToRender[this.y + '-' + this.x] = sandPile[this.y][this.x]
    }
  }
  this.coord = function(x, y) {
    this.x = x;
    this.y = y;
    return this
  }
}
function render() {
  Object.keys(cellsToRender).map(i=>{
    if (cellsToRender[i].value >= 4) ctx.fillStyle = colors[4];
    else if (cellsToRender[i].value === 3) ctx.fillStyle = colors[3];
    else if (cellsToRender[i].value === 2) ctx.fillStyle = colors[2];
    else if (cellsToRender[i].value === 1) ctx.fillStyle = colors[1];
    else if (cellsToRender[i].value === 0) ctx.fillStyle = colors[0];
    ctx.fillRect(cellsToRender[i].x * sizeFactor, cellsToRender[i].y * sizeFactor, sizeFactor, sizeFactor);
  }) 
  cellsToRender = {};  
}
function addSand (nb) {
  sandPile[size / 2][size / 2].update(nb);
}
let msCalculation = 0;
let msRenderer = 0;
let intervalCalculation;
let intervalRenderer;
function loopCalculation () {
  intervalCalculation = setInterval(_ => {
    addSand(10);
  }, msCalculation);
}
function loopRenderer () {
  intervalRenderer = setInterval(_ => {
    render();
  }, msRenderer);
}

document.getElementById('ms-renderer').value = msRenderer;
document.getElementById('ms-renderer').onkeyup = ev => {
  clearInterval(intervalRenderer);
  msRenderer = Number(ev.target.value);
  loopRenderer();
};
document.getElementById('range-renderer').onchange = ev => {
  document.getElementById('ms-renderer').value = Number(ev.target.value);
  clearInterval(intervalRenderer);
  msRenderer = Number(ev.target.value);
  loopRenderer();
};
document.getElementById('resume-renderer').onclick = ev => {
  clearInterval(intervalRenderer);
  loopRenderer();
};
document.getElementById('stop-renderer').onclick = ev => {
  clearInterval(intervalRenderer);
};

document.getElementById('ms-calculation').value = msCalculation;
document.getElementById('ms-calculation').onkeyup = ev => {
  clearInterval(intervalCalculation);
  msCalculation = Number(ev.target.value);
  loopCalculation();
};
document.getElementById('range-calculation').onchange = ev => {
  document.getElementById('ms-calculation').value = Number(ev.target.value);
  clearInterval(intervalCalculation);
  msCalculation = Number(ev.target.value);
  loopCalculation();
};
document.getElementById('resume-calculation').onclick = ev => {
  clearInterval(intervalCalculation);
  loopCalculation();
};
document.getElementById('stop-calculation').onclick = ev => {
  clearInterval(intervalCalculation);
};

document.getElementById('size').value = sizeFactor;
document.getElementById('size').onkeyup = ev => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  clearInterval(intervalRenderer);
  sizeFactor = Number(ev.target.value);
  loopRenderer();
};
document.getElementById('range-size').onchange = ev => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById('size').value = Number(ev.target.value);
  clearInterval(intervalRenderer);
  sizeFactor = Number(ev.target.value);
  loopRenderer();
};

for (let i = 0; i <= 4; i++) {
  document.getElementById('color-' + i).value = colors[i];
  document.getElementById('color-' + i).onkeyup = ev => {
    if (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test('#ac3')) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      colors[i] = ev.target.value;
    }
  };
}

document.getElementById('save').onclick = ev => {
  save()
};

document.getElementById('restore').onclick = ev => {
  restore()
};
function save() {
  window.localStorage.setItem('colors', JSON.stringify(colors));
  window.localStorage.setItem('sandPile', JSON.stringify(sandPile));
}

function restore() {
  sandPile = JSON.parse(window.localStorage.setItem('sandPile') || []);
  colors = JSON.parse(window.localStorage.setItem('colors') || []);
  console.log(colors)
}
