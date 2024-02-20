import { isNumber } from "./isNumber";

const addComma = (num: number | string | undefined) => {
	if (num === undefined || !isNumber(num)) return;
	const parts = num.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");
};
export default addComma;
