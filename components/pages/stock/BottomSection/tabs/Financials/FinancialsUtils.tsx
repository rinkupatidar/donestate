import { FinancialsResponseInterface } from "./FinancialsInterface"

export const shouldValueHighlight = (obj: FinancialsResponseInterface["financial_data"][0]): boolean => {
	if ([4, 7, 11, 22, 38, 50, 62].includes(obj.position)) return true
	return false
}

export const temp = [
	{
		position: 1,
		statement_date: "2022-12-31",
		statement_type: "BALANCE_SHEET",
		report_type: "AS_REPORTED",
		financial_data: [
			{
				position: 1,
				display_name: "Cash & Equivalents",
				amount: 20535000,
			},
		],
	},
	{
		position: 1,
		statement_date: "2022-12-31",
		statement_type: "BALANCE_SHEET",
		report_type: "AS_REPORTED",
		financial_data: [
			{
				position: 1,
				display_name: "Cash & Equivalents",
				amount: 20535000,
			},
		],
	},
]
