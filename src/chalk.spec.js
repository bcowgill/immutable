// chalk test plan template

const JS = require('jstest')
const mychalk = require('./chalk')

with (JS.Test)
{

describe('chalk', function () { with (this) { addSkip(this)

	function mapCharCodes (actual)
	{
		const mapped = []
		for (var idx = 0; idx < actual.length; ++idx)
		{
			const code = actual.charCodeAt(idx)
			mapped.push(code < ' '.charCodeAt(0) ? code : actual.charAt(idx))
		}
		// console.error('== mapCharCodes ==', mapped)
		return mapped
	}

	it('error text is colored ' + mychalk.error('red'), function () { with (this) {
		console.error(mychalk.error('chalk error text'))
		console.warn(mychalk.warn('chalk warn text'))
		console.log(mychalk.log('chalk log text'))
		console.info(mychalk.info('chalk info text'))
		console.info(mychalk.debug('chalk debug text'))
		const chalked = mychalk.error('error')
		assertEqual([
			27, '[', '1', 'm',
			27, '[', '3', '1', 'm',
			'e', 'r', 'r', 'o', 'r',
			27, '[', '3', '9', 'm',
			27, '[', '2', '2', 'm'
			], mapCharCodes(chalked))
	}})

	it('warning text is colored ' + mychalk.warn('orange'), function () { with (this) {
		const chalked = mychalk.warn('error')
		assertEqual([
			27, '[', '9', '3', 'm',
			'e', 'r', 'r', 'o', 'r',
			27, '[', '3', '9', 'm',
			], mapCharCodes(chalked))
	}})

	it('log text is colored ' + mychalk.log('white'), function () { with (this) {
		const chalked = mychalk.log('error')
		assertEqual([
			27, '[', '3', '7', 'm',
			'e', 'r', 'r', 'o', 'r',
			27, '[', '3', '9', 'm',
			], mapCharCodes(chalked))
	}})

	it('info text is colored ' + mychalk.info('cyan'), function () { with (this) {
		const chalked = mychalk.info('error')
		assertEqual([
			27, '[', '3', '6', 'm',
			'e', 'r', 'r', 'o', 'r',
			27, '[', '3', '9', 'm',
			], mapCharCodes(chalked))
	}})

	it('debug text is colored ' + mychalk.debug('green'), function () { with (this) {
		const chalked = mychalk.debug('error')
		assertEqual([
			27, '[', '3', '2', 'm',
			'e', 'r', 'r', 'o', 'r',
			27, '[', '3', '9', 'm',
			], mapCharCodes(chalked))
	}})
}})

}
