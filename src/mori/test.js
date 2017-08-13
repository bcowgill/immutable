const mori = require('mori')
const a0 = [1,2,3];

mori.map(mori.inc, a0); // => (2 3 4)

const a1 = [4,5,6];
const a2 = [7,8,9];

const r = mori.map(mori.vector, a0, a1, a2); // => ([1 4 7] [2 5 8] [3 6 9])
console.log('r', r)
