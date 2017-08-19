// chalk.js - coloured logging for error, warn, log, info, debug

const chalk = require('chalk')
const konsole = console

function str (obj)
{
	return typeof obj === 'object' ? JSON.stringify(obj) : obj
}

const write =
{
	chalk: chalk,

	color: {
		error: chalk.red,
		warn:  chalk.keyword('orange'),
		log:   chalk.white,
		info:  chalk.cyan,
		debug: chalk.green,

		alt: {
			alt: void 0,

			error: chalk.bold.red,
			warn:  chalk.bold.keyword('orange'),
			log:   chalk.bold.white,
			info:  chalk.bold.cyan,
			debug: chalk.bold.green,
		},
	},

	getLogger: function (type, logger)
	{
		type = type || 'log'
		logger = logger || konsole
		const colors = [write.color[type], write.color.alt[type]]
		const log = logger[type] || logger.log

		return function ()
		{
			const argz = Array.prototype.slice.call(arguments)
			for (var idx = 0; idx < argz.length; ++idx)
			{
				argz[idx] = colors[idx % 2](str(argz[idx]))
			}
			log.call(logger, argz.join(' '))
		}
	},
}
write.color.alt.alt = write.color

Object.keys(write.color).forEach(function (type) {
	if (type !== 'alt')
	{
		write[type] = write.getLogger(type)
	}
})

module.exports = write

