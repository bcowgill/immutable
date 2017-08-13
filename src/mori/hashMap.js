const mori = require('mori')

const o = mori.hashMap('a', 1, 'b', 2)
const o2 = mori.assoc(o, 'a', 3)

console.log('o', o)
console.log('o get.a', mori.get(o, 'a'))
console.log('o2', o2)
console.log('o2 get.a', mori.get(o2, 'a'))

