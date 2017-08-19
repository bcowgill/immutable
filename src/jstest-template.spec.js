// jstest-template test plan template

const JS = require('jstest')

with (JS.Test)
{

describe('jstest-template', function () { with (this) { addSkip(this)

	before(function () { with (this) {
		console.log('   - before block reached')
	}})

	after(function () { with (this) {
		console.log('   - after block reached')
	}})

	it('assert - boolean', function () { with (this) {
		assert(true, 'with message')
	}})

}})

}
