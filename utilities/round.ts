import addComma from "./addComma"

interface configTypes {
	decimal?: number
	comma?: boolean
	keepDecimal?: boolean
}
export function round(num: number | string | undefined, config: configTypes = {}) {
	if (num === undefined) return
	const { decimal = 2, comma = false, keepDecimal = false } = config
	num = +num
	var p = Math.pow(10, decimal)
	let roundedVal = (Math.round(num * p) / p).toFixed(decimal)
	// remove decimal if 0
	if (keepDecimal === false) roundedVal = roundedVal.replace(/\.0+$/, "")

	if (comma) return addComma(roundedVal)
	return roundedVal
}
