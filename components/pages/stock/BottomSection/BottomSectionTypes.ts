export interface CompanyProfileResponseInterface {
	industry: string
	website: string
	ceo: string
	sector: string
	country: string
	phone: string
	address: string
	city: string
	state: string
	zip: string
	equity_symbol: string
	equity_name: string
	equity_currency: string
	cik_number: string
	is_in: string
	cus_ip: string
	company_description: string
	no_of_employees: string
	company_logo: string
	company_valuation: {
		enterprise_value: string
		enterprise_value_to_ebitda: string
		enterprise_value_to_sales: string
		graham_number: string
		net_debt: string
		pe_current: string
		pe_ratio_with_extraordinary_items: string
		pe_ratio_without_extraordinary_items: string
		price_to_book_ratio: string
		price_to_cashflow_ratio: string
		price_to_sales_ratio: string
		latest_annual_enterprise_value: {
			ev_per_share: string
		}
		equity_current_valuation: {
			discounted_cash_flow: string
		}
	}
	company_efficiency: {
		average_inventory: number
		average_payables: number
		average_receivables: number
		capex_per_revenue: number
		days_of_inventory_on_hand: number
		days_payables_outstanding: number
		days_sales_outstanding: number
		income_per_employee: number
		intangibles_per_total_assets: number
		inventory_turnover: number
		payables_turnover: number
		rd_per_revenue: number
		receivables_turnover: number
		revenue_per_employee: number
		sg_per_revenue: number
	}
	liquidity_and_profitability: {
		cash_ratio: number
		current_ratio: number
		gross_margin: number
		net_margin: number
		operating_margin: number
		pretax_margin: number
		quick_ratio: number
		return_on_assets: number
		return_on_equity: number
		return_on_inv_capital: number
		return_on_t_capital: number
		return_on_tangible_assets: number
	}
	capitalization: {
		long_term_debt_to_equity: number
		long_term_debt_to_total_capital: number
		total_debt_to_total_assets: number
		total_debt_to_total_capital: number
		total_debt_to_total_equity: number
	}
	basic_key_metrics: {
		day_range: string
		week_range_52: number
		market_cap: number
		shares_outstanding: number
		public_float: number
		beta: number
		pe_ratio: number
		revenue_per_employee: number
		earnings_yield: number
		yield: number
		ex_div_date: number
		dividend: number
		float_shorted_percentage: number
		short_interest: number
		average_volume: number
	}

	board_members: {
		name: string
		designation: string
		salary: number
		currency: string
		gender: string
		year_born: number
		title_since: number
	}[]
}
// title since and 52 week range gives null
