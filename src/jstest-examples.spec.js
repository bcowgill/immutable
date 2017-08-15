// jstest assertion examples

const JS = require('jstest')
const util = require('util')

with (JS.Test)
{

console.log('Assertion Errors recognised by JS.Test', ASSERTION_ERRORS.join(', '))
console.log('JS keys: ', Object.keys(JS).sort().join(', '))
console.log('JS.Test methods: ', JS.Test.methods().sort().join(', '))

describe('jstest-examples', function () { with (this) { addSkip(this)
	const xbefore = function () {}
	const xafter = xbefore

	// a module (mixin) for extending classes
	const Mixin = new JS.Module('MixinNamed', {
		random: function ()
		{
			return Math.random()
		}
	})

	// some classes for testing assertKindOf
	const Animal = new JS.Class('AnimalNamed', {
		initialize: function (name)
		{
			this.name = name
		},

		speak: function (things)
		{
			return 'My name is ' + this.name + ' and I like ' + things
		},
	})

	const Dog = new JS.Class('DogNamed', Animal, {
		include: [ Mixin ],

		speak: function (stuff)
		{
			return this.callSuper().toUpperCase() + '!'
		},

		huntForBones: function (garden)
		{
		},
	})

	// jstest custom matcher for assertEqual/assertNotEqual
	const matchPersonNamed = function (name) {
		return {
			equals: function (value)
			{
				return (typeof value === "object") && (value.name === name)
			},
			toString: function () {
				return "Person named " + name
			},
		}
	}

	xbefore(function () { with (this) {
		console.log('   - before block reached')
	}})

	xafter(function () { with (this) {
		console.log('   - after block reached')
	}})

	it('assert - boolean', function () { with (this) {
		assert(true)
		assert(1, 'with message')
		assert('truthy')
		// assert(null)
		// assert(void 0)
		// assert(false, 'with failure message')
		// assert(0)
		// assert('')
	}})

	it('assertNot - boolean', function () { with (this) {
		assertNot(null)
		assertNot(void 0)
		assertNot(false, 'with failure message')
		assertNot(0)
		assertNot('')
		// assertNot(true)
		// assertNot(1, 'with failure message')
		// assertNot('truthy')
	}})

	it('assertNull', function () { with (this) {
		assertNull(null)
		// assertNull(void 0)
		// assertNull(false, 'with failure message')
		// assertNull(0)
		// assertNull('')
	}})

	it('assertNotNull', function () { with (this) {
		assertNotNull(void 0)
		assertNotNull(false, 'with failure message')
		assertNotNull(0)
		assertNotNull('')
		// assertNotNull(null)
	}})

	it('assertEqual - simple', function () { with (this) {
		assertEqual(true, true)
		assertEqual(42, 42, 'with failure message')
		// assertEqual(42, 43, 'with failure message')
		// assertEqual(null, void 0)
	}})

	it('assertEqual - deep', function () { with (this) {
		assertEqual([1, 5, 7], [1, 5, 7])
		assertEqual({'a': 12, 'b': 56}, {'b': 56, 'a': 12})
		// assertEqual([1, 5, 7], [1, 5, 8], 'with failure message')
		// assertEqual({'a': 12, 'b': 56}, {'b': 56, 'a': 13}, 'with failure message')
	}})


	it('assertEqual - custom matcher', function () { with (this) {
		assertEqual( matchPersonNamed("Bond"), {name: "Bond"} )
		// assertEqual( matchPersonNamed("Bond"), {name: "Bound"} )
	}})

	it('assertNotEqual - simple', function () { with (this) {
		assertNotEqual(true, false)
		assertNotEqual(42, 43, 'with failure message')
		// assertNotEqual(42, 42, 'with failure message')
		// assertNotEqual(null, null)
	}})

	it('assertNotEqual - deep', function () { with (this) {
		assertNotEqual([1, 5, 7], [1, 5, 8])
		assertNotEqual({'a': 12, 'b': 56}, {'b': 56, 'a': 13})
		// assertNotEqual([1, 5, 7], [1, 5, 7], 'with failure message')
		// assertNotEqual({'a': 12, 'b': 56}, {'b': 56, 'a': 12}, 'with failure message')
	}})

	it('assertNotEqual - custom matcher', function () { with (this) {
		assertNotEqual( matchPersonNamed("Bond"), {name: "Bound"} )
		// assertNotEqual( matchPersonNamed("Bond"), {name: "Bond"} )
	}})

	it('assertSame', function () { with (this) {
		const a = [1, 5, 7]
		const o = {'a': 12, 'b': 56}
		assertSame(true, true)
		assertSame(42, 42, 'with failure message')
		assertSame(a, a)
		assertSame(o, o)
		// assertSame([1, 5, 7], [1, 5, 7])
		// assertSame({'a': 12, 'b': 56}, {'b': 56, 'a': 12})
	}})

	it('assertNotSame', function () { with (this) {
		const a = [1, 5, 7]
		const o = {'a': 12, 'b': 56}
		// assertNotSame(true, true)
		// assertNotSame(42, 42, 'with failure message')
		// assertNotSame(a, a)
		// assertNotSame(o, o)
		assertNotSame([1, 5, 7], [1, 5, 7])
		assertNotSame({'a': 12, 'b': 56}, {'b': 56, 'a': 12})
	}})

	it('assertInDelta', function () { with (this) {
		const epsilon = 0.01
		assertInDelta(42.001, 42, epsilon)
		// assertInDelta(42.1, 42, epsilon, 'with failure message, not close enough')
	}})

	it('assertKindOf - basics', function () { with (this) {
		assertKindOf('number', 53)
		assertKindOf(Number, 53)

		assertKindOf(Number, new Number(53))
		assertKindOf('object', new Number(53))
		assertKindOf(Object, new Number(53))
		// assertKindOf('Number', new Number(53))

		assertKindOf('boolean', true)
		assertKindOf('object', /^this$/)
		assertKindOf(RegExp, /^this$/)
		assertKindOf(Error, new RangeError('test'))
		// assertKindOf(String, /^this$/)
	}})

	it('assertMatch - regex', function () { with (this) {
		assertMatch(/^this$/, 'this')
		assertMatch(/this/, 'is not this a match?')
		assertMatch('this', 'this')
		assertMatch(new RegExp('^this$', 'i'), 'tHiS')
		// assertMatch('this', 'is not this a match?')
		// assertMatch(/^this$/, '  this  ', 'with failure message')
	}})

	it('assertMatch - objects with a .match() method', function () { with (this) {
		assertMatch(new JS.Range(1, 10), 5)
		// assertMatch(new JS.Range(1, 10), 51)
	}})

	it('assertNoMatch - regex', function () { with (this) {
		// assertNoMatch(/^this$/, 'this')
		// assertNoMatch(/this/, 'is not this a match?')
		// assertNoMatch('this', 'this')
		// assertNoMatch(new RegExp('^this$', 'i'), 'tHiS')
		assertNoMatch('this', 'is not this a match?')
		assertNoMatch(/^this$/, '  this  ', 'with failure message')
	}})

	it('assertNoMatch - objects with a .match() method', function () { with (this) {
		// assertNoMatch(new JS.Range(1, 10), 5)
		assertNoMatch(new JS.Range(1, 10), 51)
	}})

	it('assertRespondTo', function () { with (this) {
		assertRespondTo([], 'length', 'has a property')
		assertRespondTo([], 'push', 'has a method')
		// assertRespondTo([], 'xyasy', 'with failure message, has a method')
	}})

	it('assertThrows', function () { with (this) {
		const chuck = function (obj) { obj.foo() }
		const errorThrown = function (fn) {
			let message = 'nothing thrown'
			try { fn() } catch (error) { message = error}
			return message
		}
		assertThrows(Error, TypeError, chuck)
		assertMatch(/Cannot read property/, errorThrown(chuck))
		// assertThrows('TypeError: Cannot read property \'foo\' of undefined', chuck)
		// assertThrows(RangeError, chuck)
		// assertThrows(TypeError, function () {})
	}})

	it('assertNothingThrown', function () { with (this) {
		const safe = function () { return 1 + 1 }
		const chuck = function (obj) { obj.foo() }
		assertNothingThrown(Error, TypeError, safe)
		assertNothingThrown('TypeError: Cannot read property \'foo\' of undefined', safe)
		// assertNothingThrown(Error, TypeError, chuck)
		// assertNothingThrown('TypeError: Cannot read property \'foo\' of undefined', chuck)
		// assertNothingThrown(RangeError, chuck)
	}})

	it('assertBlock', function () { with (this) {
		const chuck = function (obj) { obj.foo() }
		assertBlock(function () { return true })
		assertBlock(function () { return 42 })
		// assertBlock(function () { return false })
		// assertBlock(function () { return null })
		// assertBlock(function () { return 0 })
		// assertBlock(chuck)
		// assertBlock('with failure message for block', function () { return false })
	}})

describe('JS.Class', function () { with (this) { addSkip(this)
	it('assertKindOf', function () { with (this) {
		console.log('JS.Class methods: ', JS.Class.methods().sort().join(', '))
		// console.log('JS.Class instance', util.inspect(jsc))
		const jsc = new JS.Class()
		assertKindOf(JS.Class, jsc)
		assertKindOf(Object, jsc)
	}})

	it('displayName - for debugging', function () { with (this) {
		// WebKit debugger/profiler type name, will not work right in node!
		const dog = new Dog('bark')
		assertEqual('DogNamed', Dog.displayName)
		// assertEqual('DogNamed', dog.speak.displayName)
		Animal.displayName = 'Animal42'
		assertEqual('Animal42', Animal.displayName)
		assertEqual('Animal42', Animal.toString())
		Animal.setName('Whalerus')
		assertEqual('Whalerus', Animal.displayName)
		assertEqual('Whalerus', Animal.toString())
		Animal.setName('AnimalNamed')
	}})

	it('assertKindOf - Animal', function () { with (this) {
		const animal = new Animal('panther')
		console.log('Animal methods: ', Animal.methods().sort().join(', '))
		console.log('animal instance methods: ', animal.methods().sort().join(', '))
		assertKindOf(Animal, animal)
		assertKindOf(Object, animal)
		assert(animal instanceof Animal, 'animal instanceof Animal')
		assert(animal.isA(Animal), 'animal.isA Animal')
		assertEqual('My name is panther and I like hunting', animal.speak('hunting'))
		// assertKindOf(JS.Class, animal, 'does not inherit from JS.Class')
	}})

	it('interface', function () { with (this) {
		assertKindOf(Function, Animal.enumFor)
		assertKindOf(Function, Animal.toEnum)
		// assertEqual('function', Animal.enumFor())
		// assertEqual('function', Animal.toEnum())

	}})

	it('klass', function () { with (this) {
		const animal = new Animal('gorilla')

		assertKindOf(Function, Animal.klass)
		assertKindOf(Function, animal.klass)

		assertKindOf(JS.Class, Animal.klass, 'klass of Animal class')
		assertSame(Animal, animal.klass, 'klass of Animal instance')
		assertKindOf(Animal, new animal.klass(), 'new klass of Animal instance')
	}})

	it('assertKindOf - Dog -> Animal', function () { with (this) {
		const animal = new Dog('rex')
		assertKindOf(Dog, animal)
		assertKindOf(Animal, animal)
		assertKindOf(Object, animal)
		assertEqual('MY NAME IS REX AND I LIKE HUNTING!', animal.speak('hunting'))
	}})

	it('hash', function () { with (this) {
		const animal = new Animal('horse')
		const animal2 = new Animal('horse')

		assertKindOf(Function, Animal.hash)
		assertKindOf(Function, animal.hash)

		assertEqual(Animal.hash(), Animal.hash())
		assertEqual(Dog.hash(), Dog.hash())
		assertNotEqual(Animal.hash(), Dog.hash())
		assertNotEqual(animal.hash(), Animal.hash())
		assertNotEqual(animal2.hash(), animal.hash())
	}})

	it('toString', function () { with (this) {
		const animal = new Animal('mouse')

		assertKindOf(Function, Animal.toString)
		assertKindOf(Function, animal.toString)

		assertEqual('AnimalNamed', Animal.toString())
		// TODO what! why?
		// assertEqual('Dog', Dog.displayName, 'Dog displayName')
		// assertEqual('Dog', Dog.toString(), 'Dog to string')
		assertMatch(/^#<AnimalNamed:[0-9a-f]+>$/, animal.toString())
	}})

	it('superclass', function () { with (this) {
		const animal = new Animal('donkey')

		assertKindOf(Function, Animal.superclass)
		assertNot(animal.superclass)

		assertKindOf('object', Animal.superclass(), 'Animal superclass')
		assertKindOf(Function, Dog.superclass(), 'Dog superclass')
		// assertEqual(Animal, Dog.superclass(), 'Dog superclass')
	}})

	it('ancestors', function () { with (this) {
		const animal = new Animal('cobra')

		assertKindOf(Function, Animal.ancestors)
		assertNot(animal.ancestors)

		assertEqual([ JS.Kernel, Animal ], Animal.ancestors())
		assertEqual([ 'Kernel', 'AnimalNamed' ], Animal.ancestors().map(fn => fn.toString()))
	}})

	it('subclasses', function () { with (this) {
		const animal = new Animal('viper')

		assertKindOf('object', Animal.subclasses, 'Animal subclasses')
		assertNot(animal.subclasses, 'animal subclasses')

		assertEqual(true, Array.isArray(Animal.subclasses))
		assertEqual(1, Animal.subclasses.length)
		assertSame(Dog, Animal.subclasses[0])

		assertKindOf('object', Dog.subclasses, 'Dog subclasses')
		assertEqual(true, Array.isArray(Dog.subclasses))
		assertEqual(0, Dog.subclasses.length)
	}})

	it('includes, Dog ->> Mixin', function () { with (this) {
		const animal = new Animal('platypus')

		assertKindOf(Function, Animal.includes)
		assertNot(animal.includes)

		assertEqual(true, Dog.includes(Mixin), 'Dog mixes in Mixin')
		assertEqual(true, Dog.includes(Animal), 'Dog inherits from Animal')
		assertEqual(false, Dog.includes(Error), 'Dog does not inherit Error')

		assertRespondTo(new Dog(), 'random')
	}})

	it('lookup', function () { with (this) {
		const animal = new Animal('panther')

		assertKindOf(Function, Animal.lookup)
		assertNot(animal.lookup)

		assertEqual(0, Animal.lookup('unknownMethod').length)
		assertEqual(1, Animal.lookup('isA').length)
	}})

	it('instanceMethod/s', function () { with (this) {
		const animal = new Animal('walrus')

		assertKindOf(Function, Animal.instanceMethod)
		assertKindOf(Function, Animal.instanceMethods)
		assertNot(animal.instanceMethod)
		assertNot(animal.instanceMethods)

		assertEqual([
			'initialize',
			'speak',
			], Animal.instanceMethods(false).sort())
		assertEqual([
			'__',
			'__eigen__',
			'enumFor',
			'equals',
			'extend',
			'hash',
			'initialize',
			'isA',
			'method',
			'methods',
			'speak',
			'tap',
			'toEnum',
			'toString',
			'wait',
			], Animal.instanceMethods().sort())
		assertEqual(void 0, Animal.instanceMethod('unknownMethod'))
		const instanceMethod = Animal.instanceMethod('speak')
		assertKindOf(JS.Method, instanceMethod)
		assertEqual(Animal, instanceMethod.module)
		assertEqual('speak', instanceMethod.name)
		assertEqual(1, instanceMethod.arity)
	}})

	it('method/s', function () { with (this) {
		const animal = new Animal('badger')

		assertKindOf(Function, Animal.method)
		assertKindOf(Function, Animal.methods)
		assertKindOf(Function, animal.method)
		assertKindOf(Function, animal.methods)

		assertEqual([
			'__',
			'__eigen__',
			'__name__',
			'alias',
			'ancestors',
			'define',
			'enumFor',
			'equals',
			'extend',
			'hash',
			'include',
			'includes',
			'initialize',
			'instanceMethod',
			'instanceMethods',
			'isA',
			'lookup',
			'match',
			'method',
			'methods',
			'resolve',
			'setName',
			'shouldIgnore',
			'tap',
			'toEnum',
			'toString',
			'wait',
			], Animal.methods().sort())
		assertEqual(void 0, Animal.method('unknownMethod'))
		assertKindOf(Function, Animal.method('resolve'))

		assertEqual([
			'__',
			'__eigen__',
			'enumFor',
			'equals',
			'extend',
			'hash',
			'initialize',
			'isA',
			'method',
			'methods',
			'speak',
			'tap',
			'toEnum',
			'toString',
			'wait',
			], animal.methods().sort())
		assertEqual(void 0, animal.method('unknownMethod'))
		assertKindOf(Function, animal.method('speak'))
		const boundMethod = animal.method('speak')
		assertEqual('My name is badger and I like potatoes', boundMethod('potatoes'))
	}})
}})
}})

describe.skip('test failure', function () { with (this) { addSkip(this)
	it.skip('assertion', function () { with (this) {
		assertEqual(true, false)
	}})
}})

}
