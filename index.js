const sandPile = Array(200).fill(0).map(_ => {
  return Array(200).fill(0);
});
console.log(sandPile);
function render () {
  const canvas = document.getElementById('myCanvas');
  for (let y = 0; y < sandPile.length; y++) {
    for (let x = 0; x < sandPile.length; x++) {
      const sand = sandPile[y][x];
      if (sand > 4) {
        sandPile[y][x] -= 4;
        sandPile[y][x + 1] += 1;
        sandPile[y][x - 1] += 1;
        sandPile[y + 1][x] += 1;
        sandPile[y - 1][x] += 1;
      }
    }
  }
  var ctx = canvas.getContext('2d');
  for (let y = 0; y < sandPile.length; y++) {
    for (let x = 0; x < sandPile.length; x++) {
      const sand = sandPile[y][x];
      if (sand >= 4) ctx.fillStyle = 'rgb(0,0,0)';
      if (sand === 3) ctx.fillStyle = 'rgb(255,0,0)';
      if (sand === 2) ctx.fillStyle = 'rgb(0,255,0)';
      if (sand === 1) ctx.fillStyle = 'rgb(0,0,255)';
      if (sand === 0) ctx.fillStyle = 'rgb(255,255,255)';
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

function addSand (nb) {
  console.log('add sand');
  sandPile[200 / 2][200 / 2] += nb;
}
let ms = 200;
let interval;
function loop () {
  interval = setInterval(_ => {
    addSand(1);
    render();
  }, ms);
}

console.log(document.getElementById('stop'));
document.getElementById('stop').onclick = ev => {
  clearInterval(interval);
};
document.getElementById('ms').onkeyup = ev => {
  ms = Number(ev.target.value);
  console.log('change to ' + ms);
  clearInterval(interval);
  loop();
};
document.getElementById('resume').onclick = ev => {
  console.log('hey');
  loop();
};
