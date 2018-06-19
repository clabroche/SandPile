const sandBox = require('./sandPile')
sandPile = sandBox.get(800);

let colors = [
    '#fff',
    '#939ac4',
    '#525c95',
    '#040f55',
    '#000'
];
module.exports = { sandPile, sandBox, colors};
