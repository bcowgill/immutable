const immutable = require('immutable')

const a = immutable.List.of(1, 2)
const a2 = a.push(3)

console.log('a', a)
console.log('a2', a2)
