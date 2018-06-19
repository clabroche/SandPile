const _ = require('lodash');

let sandBox = {}
const size = 800;
const sandPile = Array(size).fill(0).map((_, y) => {
    return Array(size).fill().map((_, x) => {
        return new cell().coord(x, y)
    });
});

let colors = [
    '#fff',
    '#939ac4',
    '#525c95',
    '#040f55',
    '#000'
];

let sizeFactor = 1;
sandBox.cellsToRender = {}
function cell() {
    this.value = 0;
    this.x = 0;
    this.y = 0;
    this.update = function (nb) {
        this.value += nb || 1;
        if (this.value >= 4) {
            this.value -= 4;
            sandPile[this.y][this.x + 1].update(1)
            sandPile[this.y][this.x - 1].update(1);
            sandPile[this.y + 1][this.x].update(1);
            sandPile[this.y - 1][this.x].update(1);
            sandBox.cellsToRender[this.y + '-' + this.x + 1] = sandPile[this.y][this.x + 1]
            sandBox.cellsToRender[this.y + '-' + this.x - 1] = sandPile[this.y][this.x - 1]
            sandBox.cellsToRender[this.y + 1 + '-' + this.x] = sandPile[this.y + 1][this.x]
            sandBox.cellsToRender[this.y - 1 + '-' + this.x] = sandPile[this.y - 1][this.x]
            sandBox.cellsToRender[this.y + '-' + this.x] = sandPile[this.y][this.x]
        }
    }
    this.coord = function (x, y) {
        this.x = x;
        this.y = y;
        return this
    }
}
function addSand(nb) {
    sandPile[size / 2][size / 2].update(nb);
}
let msCalculation = 0;
let msRenderer = 0;
let intervalCalculation;
let intervalRenderer;

sandBox.loopCalculation = function () {
    intervalCalculation = setInterval(_ => {
        addSand(10);
    }, msCalculation);
}

sandBox.changeMs = ms => {
    clearInterval(intervalCalculation);
    msCalculation = Number(ms);
    loopCalculation();
};
sandBox.start = _ => {
    clearInterval(intervalCalculation);
    sandBox.loopCalculation();
};
sandBox.stop = ev => {
    clearInterval(intervalCalculation);
};
sandBox.get = ev => {
    return sandPile;
};
module.exports = sandBox