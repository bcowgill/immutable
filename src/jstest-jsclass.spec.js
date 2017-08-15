// jsclass usage examples

const JS = require('jstest')
const util = require('util')

with (JS.Test)
{

describe('JS.Class', function () { with (this) { addSkip(this)

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

}
