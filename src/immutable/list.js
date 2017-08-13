const immutable = require('immutable')

//const a = immutable.List.of(1, 2)
const a = immutable.List([1, 2])
const a2 = a.push(3)

console.log('a', a)
console.log('a', a.size)
console.log('a2', a2)
console.log('a2', a2.get(2))
