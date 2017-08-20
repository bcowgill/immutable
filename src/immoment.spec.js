// immoment test plan template

const JS = require('jstest')
const util = require('util')
const moment = require('moment')
const immoment = require('./immoment')
//const immoment = moment

with (JS.Test)
{

describe('immoment', function () { with (this) { addSkip(this)

	const times = {
		'946684800000': '2000-01-01T00:00:00.000Z',
		'946684800001': '2000-01-01T00:00:00.001Z',
		'949536000000': '2000-02-03T00:00:00.000Z',
		'952041600000': '2000-03-03T00:00:00.000Z',
	}

	before(function () { with (this) {
		console.log('   - before block reached')
		this.assertTime = function (epoch, actual)
		{
			this.assertEqual(epoch, actual.valueOf())
			this.assertEqual(times[epoch], actual.toISOString())
		}
	}})

	it('constructor now void', function () { with (this) {
		// console.log('immoment', immoment)
		// console.log('immoment()', immoment())
		// console.log('immoment().prototype', Object.getPrototypeOf(immoment()))
		const now = immoment()
		assertMatch(/\d+/, now.valueOf())
	}})

	it('constructor now []', function () { with (this) {
		const now = immoment([])
		assertMatch(/\d+/, now.valueOf())
	}})

	it('constructor now {}', function () { with (this) {
		const now = immoment({})
		assertMatch(/\d+/, now.valueOf())
	}})

	it('constructor utc now', function () { with (this) {
		const now = immoment.utc()
		assertMatch(/\d+/, now.valueOf())
	}})

	it('constructor ISO8601 string', function () { with (this) {
		const epoch = 949536000000
		const now = immoment('2000-02-03')
		assertTime(epoch, now)
	}})

	it('constructor utc ISO8601 string', function () { with (this) {
		const epoch = 949536000000
		const now = immoment.utc('2000-02-03')
		assertTime(epoch, now)
	}})

	it('constructor RFC2822 string', function () { with (this) {
		const epoch = 949536000000
		const now = immoment('3 Feb 2000 00:00 UT')
		assertTime(epoch, now)
	}})

	it('constructor ASP.NET JSON Date string', function () { with (this) {
		const epoch = 949536000000
		const now = immoment('/Date(' + epoch + ')/')
		assertTime(epoch, now)
	}})

	it('constructor string, format', function () { with (this) {
		const epoch = 949536000000
		const now = immoment('02-03-2000', 'MM-DD-YYYY')
		assertTime(epoch, now)
	}})

	it('constructor string, [formats]', function () { with (this) {
		const epoch = 949536000000
		const now = immoment('02-03-2000', ['YYYY-MM-DD', 'MM-DD-YYYY'])
		assertTime(epoch, now)
	}})

	it('constructor string, format, strict', function () { with (this) {
		const epoch = 949536000000
		const now = immoment('02-03-2000', 'MM-DD-YYYY', true)
		assertTime(epoch, now)
	}})

	it('constructor string, [formats], strict', function () { with (this) {
		const epoch = 949536000000
		const now = immoment('02-03-2000', ['YYYY-MM-DD', 'MM-DD-YYYY'], true)
		assertTime(epoch, now)
	}})

	it('constructor ISO8601 format constant', function () { with (this) {
		const epoch = 949536000000
		const now = immoment('2000-02-03', immoment.ISO_8601)
		assertTime(epoch, now)
	}})

	it('constructor string, format, locale', function () { with (this) {
		const epoch = 949536000000
		const now = immoment('février-03-2000', 'MMM-DD-YYYY', 'fr')
		assertTime(epoch, now)
	}})

	it('constructor string, [formats], locale', function () { with (this) {
		const epoch = 949536000000
		const now = immoment('février-03-2000', ['YYYY-MM-DD', 'MMM-DD-YYYY'], 'fr')
		assertTime(epoch, now)
	}})

	it('constructor string, format, locale, strict', function () { with (this) {
		const epoch = 949536000000
		const now = immoment('02-03-2000', 'MM-DD-YYYY', 'fr', true)
		assertTime(epoch, now)
	}})

	it('constructor string, [formats], locale, strict', function () { with (this) {
		const epoch = 949536000000
		const now = immoment('02-03-2000', ['YYYY-MM-DD', 'MM-DD-YYYY'], 'fr', true)
		assertTime(epoch, now)
	}})

	it('constructor props', function () { with (this) {
		const epoch = 952041600000
		const now = immoment({ year: 2000, month: 2, day: 3 })
		assertTime(epoch, now)
	}})

	it('constructor number', function () { with (this) {
		const epoch = 946684800001
		const now = immoment(epoch)
		assertTime(epoch, now)
	}})

	it('constructor unix number', function () { with (this) {
		const epoch = 946684800001
		const now = immoment.unix(Math.floor(epoch / 1000))
		assertTime(epoch - 1, now)
	}})

	it('constructor Date', function () { with (this) {
		const epoch = 952041600000
		const now = immoment(new Date(2000, 2, 3))
		assertTime(epoch, now)
	}})

	it('constructor array', function () { with (this) {
		const epoch = 952041600000
		const now = immoment([2000,2,3])
		assertTime(epoch, now)
	}})

	it('constructor Moment', function () { with (this) {
		const epoch = 952041600000
		const when = immoment([2000,2,3])
		const now = immoment(when)
		assertTime(epoch, now)
		if (immoment !== moment)
		{
			assertSame(now, when)
		}
	}})

	it('constructor clone', function () { with (this) {
		const epoch = 952041600000
		const when = immoment([2000,2,3])
		const now = when.clone()
		assertTime(epoch, now)
		if (immoment !== moment)
		{
			assertSame(now, when)
		}
	}})

	// TODO parseZone....
}})

}
