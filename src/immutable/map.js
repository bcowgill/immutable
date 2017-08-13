const immutable = require('immutable')

//const o = immutable.Map.({'a': 1, 'b': 2})
const o = immutable.Map.of('a', 1, 'b', 2)
const o2 = o.set('a', 3)

console.log('o', o)
console.log('o get.a', o.get('a'))
console.log('o2', o2)
console.log('o2 get.a', o2.get('a'))
