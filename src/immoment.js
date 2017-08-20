// immoment.js - an immutable version of moment.js

const moment = require('moment')

function MomentImmutable (when)
{
	this._moment = when
}

MomentImmutable.prototype = {
	valueOf: function ()
	{
		return this._moment.valueOf()
	},
	toISOString: function ()
	{
		return this._moment.toISOString()
	},
	clone: function ()
	{
		return this
	}
}

function immoment ()
{
	const args = Array.prototype.slice.call(arguments)
	let mom
	console.log('immoment maker', args)
	if (args.length === 0)
	{
		mom = moment()
	}
	else if (args.length === 1)
	{
		console.log('immoment proto', Object.getPrototypeOf(args[0]))
		if (Object.getPrototypeOf(args[0]) === MomentImmutable)
		{
			return args[0]
		}
		else
		{
			mom = moment(args[0])
		}
	}
	else if (args.length === 2)
	{
		mom = moment(args[0], args[1])
	}
	else if (args.length === 3)
	{
		mom = moment(args[0], args[1], args[2])
	}
	else if (args.length === 4)
	{
		mom = moment(args[0], args[1], args[2], args[3])
	}
	else if (args.length === 5)
	{
		mom = moment(args[0], args[1], args[2], args[3], args[4])
	}
	console.log('immoment made', mom)
	return new MomentImmutable(mom)
}

function immomentUTC ()
{
	const args = Array.prototype.slice.call(arguments)
	let mom
	console.log('immoment.utc maker', args)
	if (args.length === 0)
	{
		mom = moment.utc()
	}
	else if (args.length === 1)
	{
		mom = moment.utc(args[0])
	}
	else if (args.length === 2)
	{
		mom = moment.utc(args[0], args[1])
	}
	else if (args.length === 3)
	{
		mom = moment.utc(args[0], args[1], args[2])
	}
	else if (args.length === 4)
	{
		mom = moment.utc(args[0], args[1], args[2], args[3])
	}
	else if (args.length === 5)
	{
		mom = moment.utc(args[0], args[1], args[2], args[3], args[4])
	}
	console.log('immoment.utc made', mom)
	return new MomentImmutable(mom)
}

function immomentUnix (seconds)
{
	const mom = moment.unix(seconds)
	console.log('immoment.unix made', mom)
	return new MomentImmutable(mom)
}

immoment.utc = immomentUTC
immoment.unix = immomentUnix

module.exports = immoment

