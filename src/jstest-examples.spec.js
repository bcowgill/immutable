// jstest assertion examples

const JS = require('jstest')
const util = require('util')

with (JS.Test)
{

console.log('Assertion Errors recognised by JS.Test', ASSERTION_ERRORS.join(', '))
console.log('JS methods', Object.keys(JS).join(', '))
console.log('JS.Test methods', Object.keys(JS.Test).join(', '))

describe('jstest-examples', function () { with (this) { addSkip(this)
	const Animal = new JS.Class({
		initialize: function (name)
		{
			this.name = name
		},

		speak: function (things)
		{
			return 'My name is ' + this.name + ' and I like ' + things
		},
	})

	const Dog = new JS.Class(Animal, {
		speak: function (stuff)
		{
			return this.callSuper().toUpperCase() + '!'
		},

		huntForBones: function (garden)
		{
		},
	})

	before(function () { with (this) {
		console.log('   - before block reached')
	}})

	after(function () { with (this) {
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
		// TODO with custom matcher... JSON string perhaps
		// assertEqual([1, 5, 7], [1, 5, 8], 'with failure message')
		// assertEqual({'a': 12, 'b': 56}, {'b': 56, 'a': 13}, 'with failure message')
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
		// assertKindOf('Number', new Number(53))
		assertKindOf('boolean', true)
		assertKindOf('object', /^this$/)
		assertKindOf(RegExp, /^this$/)
		assertKindOf(Error, new RangeError('test'))
		// assertKindOf(String, /^this$/)
	}})

	it('assertKindOf - JS.Class', function () { with (this) {
		const jsc = new JS.Class()
		assertKindOf(JS.Class, jsc)
		assertKindOf(Object, jsc)
		// console.log('JS.Class instance', util.inspect(jsc))
	}})

	it('assertKindOf - Animal', function () { with (this) {
		const animal = new Animal('panther')
		assertKindOf(Animal, animal)
		assertKindOf(Object, animal)
		assert(animal instanceof Animal, 'animal instanceof Animal')
		assert(animal.isA(Animal), 'animal.isA Animal')
		assertEqual('My name is panther and I like hunting', animal.speak('hunting'))
		// assertKindOf(JS.Class, animal, 'does not inherit from JS.Class')
	}})

	it('assertKindOf - Dog -> Animal', function () { with (this) {
		const animal = new Dog('rex')
		assertKindOf(Dog, animal)
		assertKindOf(Animal, animal)
		assertKindOf(Object, animal)
		assertEqual('MY NAME IS REX AND I LIKE HUNTING!', animal.speak('hunting'))
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

}})

describe.skip('test failure', function () { with (this) { addSkip(this)
	it.skip('assertion', function () { with (this) {
		assertEqual(true, false)
	}})
}})

}