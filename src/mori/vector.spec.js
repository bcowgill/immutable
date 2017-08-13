const JS = require('jstest')
// Immutable Arrays are mori.vector
const mori = require('mori')

with (JS.Test)
{
	describe('mori.vector', function () { with (this) { addSkip(this)

		before(function () { with (this) {
			this.a = mori.vector(1, 2)
			this.a2 = mori.conj(a, 3)
		}})

		it('a has two items', function () { with (this) {
			assertEqual(2, mori.count(a))
		}})

		it('a2 has three items', function () { with (this) {
			assertEqual(3, mori.count(a2))
		}})

		it('use get to access items', function () { with (this) {
			assertEqual(3, mori.get(a2, 2))
		}})

		it('a and a2 are not equal', function () { with (this) {
			assertEqual(false, mori.equals(a, a2))
		}})

		it('a and b are equal', function () { with (this) {
			const b = mori.vector(1, 2)
			assertEqual(true, mori.equals(a, b))
		}})
	}})
}

