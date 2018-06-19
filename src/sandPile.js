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
            cellsToRender[this.y + '-' + this.x + 1] = sandPile[this.y][this.x + 1]
            cellsToRender[this.y + '-' + this.x - 1] = sandPile[this.y][this.x - 1]
            cellsToRender[this.y + 1 + '-' + this.x] = sandPile[this.y + 1][this.x]
            cellsToRender[this.y - 1 + '-' + this.x] = sandPile[this.y - 1][this.x]
            cellsToRender[this.y + '-' + this.x] = sandPile[this.y][this.x]
        }
    }
    this.coord = function (x, y) {
        this.x = x;
        this.y = y;
        return this
    }
}

let size = 800;
let SandPile = Array(size).fill(0).map((_, y) => {
    return Array(size).fill().map((_, x) => {
        return new cell().coord(x, y)
    });
});

function addSand(nb) {
    sandPile[size / 2][size / 2].update(nb);
}
let msCalculation = 0;
let intervalCalculation;

function loopCalculation() {
    intervalCalculation = setInterval(_ => {
        addSand(10);
    }, msCalculation);
}

SandPile.prototype.stop = function () {
    clearInterval(intervalCalculation);
    msCalculation = Number(ev.target.value);
    loopCalculation();
} 
module.exports = SandPile;