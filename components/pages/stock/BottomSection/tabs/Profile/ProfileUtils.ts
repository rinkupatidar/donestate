import { CompanyProfileResponseInterface } from "../../BottomSectionTypes"

export function getValuationDataWithDisplayNames(companyProfileData: CompanyProfileResponseInterface | undefined): { displayName: string; value: string | undefined; title: string }[] {
	return [
		{ displayName: "P/E Current", value: companyProfileData?.company_valuation.pe_current, title: "Pe Current" },
		{ displayName: "P/E (w/ extra)", value: companyProfileData?.company_valuation.pe_ratio_with_extraordinary_items, title: "Pe Ratio With Extraordinary Items" },
		{ displayName: "P/E (w/o extra)", value: companyProfileData?.company_valuation.pe_ratio_without_extraordinary_items, title: "Pe Ratio Without Extraordinary Items" },
		{ displayName: "P / Sales", value: companyProfileData?.company_valuation.price_to_sales_ratio, title: "Price To Sales Ratio" },
		{ displayName: "P / Book", value: companyProfileData?.company_valuation.price_to_book_ratio, title: "Price To Book Ratio" },
		{ displayName: "P / CF", value: companyProfileData?.company_valuation.price_to_cashflow_ratio, title: "Price To Cashflow Ratio" },
		{ displayName: "EV / EBITDA", value: companyProfileData?.company_valuation.enterprise_value_to_ebitda, title: "Enterprise Value To Ebitda" },
		{ displayName: "EV / Sales", value: companyProfileData?.company_valuation.enterprise_value_to_sales, title: "Enterprise Value To Sales" },
		{ displayName: "Net Debt/EBITDA", value: companyProfileData?.company_valuation.net_debt, title: "Net Debt" },
		{ displayName: "EV", value: companyProfileData?.company_valuation.enterprise_value, title: "Enterprise Value" },
		{ displayName: "Ev / Share", value: companyProfileData?.company_valuation.latest_annual_enterprise_value.ev_per_share, title: "Evaluation per share" },
		{ displayName: "Dcf", value: companyProfileData?.company_valuation?.equity_current_valuation?.discounted_cash_flow, title: "Discounted Cash flow" },
		{ displayName: "Graham Number", value: companyProfileData?.company_valuation.graham_number, title: "Graham Number" },
	]
}
export function getEfficiencyDataWithDisplayNames(companyProfileData: CompanyProfileResponseInterface | undefined): { displayName: string; value: number | undefined; title: string }[] {
	return [
		{ displayName: "Revn / Employee", value: companyProfileData?.company_efficiency.revenue_per_employee, title: "Revenue Per Employee" },
		{ displayName: "Income / Employee", value: companyProfileData?.company_efficiency.income_per_employee, title: "Income Per Employee" },
		{ displayName: "Receivables TO", value: companyProfileData?.company_efficiency.receivables_turnover, title: "Receivables Turnover" },
		{ displayName: "Payables TO", value: companyProfileData?.company_efficiency.payables_turnover, title: "Payables Turnover" },
		{ displayName: "Inventory TO", value: companyProfileData?.company_efficiency.inventory_turnover, title: "Inventory Turnover" },
		{ displayName: "Day Sales O/S", value: companyProfileData?.company_efficiency.days_sales_outstanding, title: "Days Sales Outstanding" },
		{ displayName: "Days Payables O/S", value: companyProfileData?.company_efficiency.days_payables_outstanding, title: "Days Payables Outstanding" },
		{ displayName: "Days of Inventory on Hand", value: companyProfileData?.company_efficiency.days_of_inventory_on_hand, title: "Days Of Inventory On Hand" },
		{ displayName: "Avg Receivables", value: companyProfileData?.company_efficiency.average_receivables, title: "Average Receivables" },
		{ displayName: "Avg Payables", value: companyProfileData?.company_efficiency.average_payables, title: "Average Payables" },
		{ displayName: "Avg Inventory", value: companyProfileData?.company_efficiency.average_inventory, title: "Average Inventory" },
		{ displayName: "SG&A/Revenue", value: companyProfileData?.company_efficiency.sg_per_revenue, title: "Sg Per Revenue" },
		{ displayName: "R&D/Revenue", value: companyProfileData?.company_efficiency.rd_per_revenue, title: "Rd Per Revenue" },
		{ displayName: "CAPEX/Revenue", value: companyProfileData?.company_efficiency.capex_per_revenue, title: "Capex Per Revenue" },
		{ displayName: "Intangibles/Total Assets", value: companyProfileData?.company_efficiency.intangibles_per_total_assets, title: "Intangibles Per Total Assets" },
	]
}

export function getCapitalizationWithDisplayNames(companyProfileData: CompanyProfileResponseInterface | undefined): { displayName: string; value: number | undefined; title: string }[] {
	return [
		{ displayName: "T. Debt / T. Equity", value: companyProfileData?.capitalization.total_debt_to_total_equity, title: "Total Debt To Total Equity" },
		{ displayName: "T. Debt / T. Capital", value: companyProfileData?.capitalization.total_debt_to_total_capital, title: "Total Debt To Total Capital" },
		{ displayName: "T. Debt / T. Assets", value: companyProfileData?.capitalization.total_debt_to_total_assets, title: "Total Debt To Total Assets" },
		{ displayName: "LT Debt / Equity", value: companyProfileData?.capitalization.long_term_debt_to_equity, title: "Long Term Debt To Equity" },
		{ displayName: "LT Debt / T. Capital", value: companyProfileData?.capitalization.long_term_debt_to_total_capital, title: "Long Term Debt To Total Capital" },
	]
}

export function getLiquidityAndProfitabilityWithDisplayNames(companyProfileData: CompanyProfileResponseInterface | undefined): { displayName: string; value: number | undefined; title: string }[] {
	return [
		{ displayName: "Current Ratio", value: companyProfileData?.liquidity_and_profitability.current_ratio, title: "Current Ratio" },
		{ displayName: "Quick Ratio", value: companyProfileData?.liquidity_and_profitability.quick_ratio, title: "Quick Ratio" },
		{ displayName: "Cash Ratio", value: companyProfileData?.liquidity_and_profitability.cash_ratio, title: "Cash Ratio" },
		{ displayName: "Gross Margin", value: companyProfileData?.liquidity_and_profitability.gross_margin, title: "Gross Margin" },
		{ displayName: "Operating Margin", value: companyProfileData?.liquidity_and_profitability.operating_margin, title: "Operating Margin" },
		{ displayName: "Pretax Margin", value: companyProfileData?.liquidity_and_profitability.pretax_margin, title: "Pretax Margin" },
		{ displayName: "Net Margin", value: companyProfileData?.liquidity_and_profitability.net_margin, title: "Net Margin" },
		{ displayName: "Return on Assets", value: companyProfileData?.liquidity_and_profitability.return_on_assets, title: "Return On Assets" },
		{ displayName: "Return on Equity", value: companyProfileData?.liquidity_and_profitability.return_on_equity, title: "Return On Equity" },
		{ displayName: "Return on T Capital", value: companyProfileData?.liquidity_and_profitability.return_on_t_capital, title: "Return On T Capital" },
		{ displayName: "Return on Inv Capital", value: companyProfileData?.liquidity_and_profitability.return_on_inv_capital, title: "Return On Inv Capital" },
		{ displayName: "Return on Tangible Assets", value: companyProfileData?.liquidity_and_profitability.return_on_tangible_assets, title: "Return On Tangible Assets" },
	]
}
