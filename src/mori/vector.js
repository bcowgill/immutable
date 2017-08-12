// Immutable Arrays are mori.vector
const mori = require('mori')

var a = mori.vector(1, 2)
var a2 = mori.conj(a, 3)

console.log('a', a)
console.log('a2', a2)

