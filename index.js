const size = 40;
const sandPile = Array(size).fill(0).map(_ => {
  return Array(size).fill(0);
});
const canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

function calculation () {
  for (let y = 0; y < sandPile.length; y++) {
    for (let x = 0; x < sandPile.length; x++) {
      const sand = sandPile[y][x];
      if (sand === 0) continue;
      if (sand > 4 && (
        !sandPile[y] ||
        !sandPile[y] ||
        !sandPile[y + 1] ||
        !sandPile[y - 1] ||
        isNaN(sandPile[y][x + 1]) ||
        isNaN(sandPile[y][x - 1]) ||
        isNaN(sandPile[y + 1][x]) ||
        isNaN(sandPile[y - 1][x])
      )) {
        increaseSandPileSize();
      }
      if (sand > 4) {
        sandPile[y][x] -= 4;
        sandPile[y][x + 1] += 1;
        sandPile[y][x - 1] += 1;
        sandPile[y + 1][x] += 1;
        sandPile[y - 1][x] += 1;
      }
    }
  }
}
function increaseSandPileSize () {
  sandPile.map(row => {
    row.unshift(0);
    row.push(0);
    row.unshift(0);
    row.push(0);
    row.unshift(0);
    row.push(0);
    row.unshift(0);
    row.push(0);
    row.unshift(0);
    row.push(0);
    row.unshift(0);
    row.push(0);
    row.unshift(0);
    row.push(0);
    row.unshift(0);
    row.push(0);
    row.unshift(0);
    row.push(0);
    row.unshift(0);
    row.push(0);
    row.unshift(0);
    row.push(0);
    row.unshift(0);
    row.push(0);
  });
  sandPile.push(Array(sandPile[0].length).fill(0));
  sandPile.unshift(Array(sandPile[0].length).fill(0));
  sandPile.push(Array(sandPile[0].length).fill(0));
  sandPile.unshift(Array(sandPile[0].length).fill(0));
  sandPile.push(Array(sandPile[0].length).fill(0));
  sandPile.unshift(Array(sandPile[0].length).fill(0));
  sandPile.push(Array(sandPile[0].length).fill(0));
  sandPile.unshift(Array(sandPile[0].length).fill(0));
  sandPile.push(Array(sandPile[0].length).fill(0));
  sandPile.unshift(Array(sandPile[0].length).fill(0));
  sandPile.push(Array(sandPile[0].length).fill(0));
  sandPile.unshift(Array(sandPile[0].length).fill(0));
  sandPile.push(Array(sandPile[0].length).fill(0));
  sandPile.unshift(Array(sandPile[0].length).fill(0));
  sandPile.push(Array(sandPile[0].length).fill(0));
  sandPile.unshift(Array(sandPile[0].length).fill(0));
  sandPile.push(Array(sandPile[0].length).fill(0));
  sandPile.unshift(Array(sandPile[0].length).fill(0));
  sandPile.push(Array(sandPile[0].length).fill(0));
  sandPile.unshift(Array(sandPile[0].length).fill(0));
  sandPile.push(Array(sandPile[0].length).fill(0));
  sandPile.unshift(Array(sandPile[0].length).fill(0));
  sandPile.push(Array(sandPile[0].length).fill(0));
  sandPile.unshift(Array(sandPile[0].length).fill(0));
  console.log(sandPile.length, sandPile[0].length);
}
let colors = [
  '#fff',
  '#939ac4',
  '#525c95',
  '#040f55',
  '#000'
];

let sizeFactor = 1;
function render () {
  for (let y = 0; y < sandPile.length; y++) {
    for (let x = 0; x < sandPile.length; x++) {
      const sand = sandPile[y][x];
      if (sand >= 4) ctx.fillStyle = colors[4];
      else if (sand === 3) ctx.fillStyle = colors[3];
      else if (sand === 2) ctx.fillStyle = colors[2];
      else if (sand === 1) ctx.fillStyle = colors[1];
      else if (sand === 0) ctx.fillStyle = colors[0];
      ctx.fillRect(x * sizeFactor, y * sizeFactor, sizeFactor, sizeFactor);
    }
  }
}

function addSand (nb) {
  sandPile[size / 2][size / 2] += nb;
}
let msCalculation = 0;
let msRenderer = 0;
let intervalCalculation;
let intervalRenderer;
function loopCalculation () {
  intervalCalculation = setInterval(_ => {
    addSand(500);
    calculation();
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
      console.log(colors[i]);
      colors[i] = ev.target.value;
    }
  };
}
