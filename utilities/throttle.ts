export default function throttle(callback: any, limit: number) {
	var waiting = false // Initially, we're not waiting
	return function () {
		// We return a throttled function
		const args = arguments
		const context = this
		if (!waiting) {
			// If we're not waiting
			callback.apply(context, args) // Execute users function
			waiting = true // Prevent future invocations
			setTimeout(function () {
				// After a period of time
				waiting = false // And allow future invocations
			}, limit)
		}
	}
}
