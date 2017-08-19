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

	it('colours the console', function () { with (this) {
		mychalk.error('\tchalk error text')
		mychalk.warn('\tchalk warn text')
		mychalk.log('\tchalk log text')
		mychalk.info('\tchalk info text')
		mychalk.debug('\tchalk debug text')

		mychalk.error('this is the message', { 'prop': '34' }, [1,2,3], 'more text', console.log)
		mychalk.info('this is the message', { 'prop': '34' }, [1,2,3], 'more text', console.log)
		console.log('this is the message', { 'prop': '34' }, [1,2,3], 'more text', console.log)

		assert(true)
	}})

	it('converts objects to JSON strings', function () { with (this) {
		const logger = { }
		expect(logger, 'error')
			.given(match(/this is the message/))
			.given(match(/\{"prop":"34"\}/))
			.given(match(/\[1,2,3\]/))
			.given(match(/more text/))
			.given(match(/function \(\) \{ \[native code\] \}/))
		const log = mychalk.getLogger('error', logger)
		log('this is the message', { 'prop': '34' }, [1,2,3], 'more text', console.log)
	}})

	it('alternate color for each argument', function () { with (this) {
		let got = ''
		const logger = { error: function (string) { got = string }}
		const log = mychalk.getLogger('error', logger)
		log('A', 'B', 'C', 'D')

		assertEqual([
			27, '[', '3', '1', 'm',
			'A',
			27, '[', '3', '9', 'm',
			' ',
			27, '[', '1', 'm',
			27, '[', '3', '1', 'm',
			'B',
			27, '[', '3', '9', 'm',
			27, '[', '2', '2', 'm',
			' ',
			27, '[', '3', '1', 'm',
			'C',
			27, '[', '3', '9', 'm',
			' ',
			27, '[', '1', 'm',
			27, '[', '3', '1', 'm',
			'D',
			27, '[', '3', '9', 'm',
			27, '[', '2', '2', 'm',
			], mapCharCodes(got))
	}})

	it('error text is colored ' + mychalk.color.error('red'), function () { with (this) {


		const chalked = mychalk.color.error('error')
		assertEqual([
			27, '[', '3', '1', 'm',
			'e', 'r', 'r', 'o', 'r',
			27, '[', '3', '9', 'm',
			], mapCharCodes(chalked))
	}})

	it('warning text is colored ' + mychalk.color.warn('orange'), function () { with (this) {
		const chalked = mychalk.color.warn('error')
		assertEqual([
			27, '[', '9', '3', 'm',
			'e', 'r', 'r', 'o', 'r',
			27, '[', '3', '9', 'm',
			], mapCharCodes(chalked))
	}})

	it('log text is colored ' + mychalk.color.log('white'), function () { with (this) {
		const chalked = mychalk.color.log('error')
		assertEqual([
			27, '[', '3', '7', 'm',
			'e', 'r', 'r', 'o', 'r',
			27, '[', '3', '9', 'm',
			], mapCharCodes(chalked))
	}})

	it('info text is colored ' + mychalk.color.info('cyan'), function () { with (this) {
		const chalked = mychalk.color.info('error')
		assertEqual([
			27, '[', '3', '6', 'm',
			'e', 'r', 'r', 'o', 'r',
			27, '[', '3', '9', 'm',
			], mapCharCodes(chalked))
	}})

	it('debug text is colored ' + mychalk.color.debug('green'), function () { with (this) {
		const chalked = mychalk.color.debug('error')
		assertEqual([
			27, '[', '3', '2', 'm',
			'e', 'r', 'r', 'o', 'r',
			27, '[', '3', '9', 'm',
			], mapCharCodes(chalked))
	}})
}})

}
