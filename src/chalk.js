const chalk = require('chalk')

module.exports =
{
	error: chalk.bold.red,
	warn:  chalk.keyword('orange'),
	log:   chalk.white,
	info:  chalk.cyan,
	debug: chalk.green,
}
