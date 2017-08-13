// help testing the formatted text of an error message.
// assertMatch(/Cannot read property/, errorThrown(testFunction))
export default function errorThrown (fn)
{
	let message = 'nothing thrown'
	try {
		fn()
	}
	catch (error)
	{
		message = error
	}

	return message
}

