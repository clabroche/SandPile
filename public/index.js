const size = 800;

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
let msRenderer = 0;
let intervalRenderer;

function loopRenderer () {
  intervalRenderer = setInterval(_ => {
    console.log('hey')
    $.ajax({
      type: 'GET',
      url: 'cellsToRender',
      success: (data) => {
        cellsToRender = data
        render();
      }
    })
    // render();
  }, 1000);
}

// document.getElementById('ms-renderer').value = msRenderer;
// document.getElementById('ms-renderer').onkeyup = ev => {
//   clearInterval(intervalRenderer);
//   msRenderer = Number(ev.target.value);
//   loopRenderer();
// };
// document.getElementById('range-renderer').onchange = ev => {
//   document.getElementById('ms-renderer').value = Number(ev.target.value);
//   clearInterval(intervalRenderer);
//   msRenderer = Number(ev.target.value);
//   loopRenderer();
// };
document.getElementById('resume-renderer').onclick = ev => {
  clearInterval(intervalRenderer);
  loopRenderer();
};

// document.getElementById('ms-calculation').value = msCalculation;
// document.getElementById('ms-calculation').onkeyup = ev => {
  // clearInterval(intervalCalculation);
  // msCalculation = Number(ev.target.value);
  // loopCalculation();
// };
// document.getElementById('range-calculation').onchange = ev => {
//   document.getElementById('ms-calculation').value = Number(ev.target.value);
//   clearInterval(intervalCalculation);
//   msCalculation = Number(ev.target.value);
//   loopCalculation();
// };
document.getElementById('resume-calculation').onclick = ev => {
  $.ajax({
    type:'POST',
    url: 'start',
    success: (data) => {
      console.log(data)
    }
  })
};
document.getElementById('stop-calculation').onclick = ev => {
  clearInterval(intervalCalculation);
};
document.getElementById('stop-renderer').onclick = ev => {
  clearInterval(intervalRenderer);
};
// document.getElementById('size').value = sizeFactor;
// document.getElementById('size').onkeyup = ev => {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   clearInterval(intervalRenderer);
//   sizeFactor = Number(ev.target.value);
//   loopRenderer();
// };
// document.getElementById('range-size').onchange = ev => {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   document.getElementById('size').value = Number(ev.target.value);
//   clearInterval(intervalRenderer);
//   sizeFactor = Number(ev.target.value);
//   loopRenderer();
// };

// for (let i = 0; i <= 4; i++) {
//   document.getElementById('color-' + i).value = colors[i];
//   document.getElementById('color-' + i).onkeyup = ev => {
//     if (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test('#ac3')) {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       colors[i] = ev.target.value;
//     }
//   };
// }

document.getElementById('save').onclick = ev => {
  save()
};

document.getElementById('restore').onclick = ev => {
  restore()
};
function save() {
  $.ajax({
    type: 'POST',
    url: 'save',
    success: (data) => {
      console.log('save')
    }
  })
}

function restore() {
  this.cellsToRender = {};
  $.ajax({
    type: 'POST',
    url: 'restore',
    success: (data) => {
      console.log('restore')
      cellsToRender = {}
      setTimeout(_ => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }, 1000);
    }
  })

}
