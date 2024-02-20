import { round } from "./round";

interface configInterface {
	formatIfNoConversion?: boolean;
}
export default function convertNumberToReadable(num: number | string | undefined, config: configInterface = {}) {
	if (num === undefined) return "-";
	const { formatIfNoConversion = true } = config;
	// Nine Zeroes for Billions
	if (Math.abs(Number(num)) >= 1.0e9) return (Math.abs(Number(num)) / 1.0e9).toFixed(2) + "B";
	else if (Math.abs(Number(num)) >= 1.0e6) return (Math.abs(Number(num)) / 1.0e6).toFixed(2) + "M";
	else if (Math.abs(Number(num)) >= 1.0e3) return (Math.abs(Number(num)) / 1.0e3).toFixed(2) + "K";
	else {
		if (formatIfNoConversion) return round(num, { comma: true });
	}
}

338710374830;
