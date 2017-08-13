// Immutable Arrays are mori.vector
const mori = require('mori')

var a = mori.vector(1, 2)
var b = mori.vector(1, 2)
var a2 = mori.conj(a, 3)

console.log('a', a)
console.log('a count', mori.count(a))
console.log('a2', a2)
console.log('a2 get.2', mori.get(a2, 2))
console.log('equals o o2', mori.equals(a, a2))
console.log('equals a b', mori.equals(a, b))
console.log('a === b', a === b)
