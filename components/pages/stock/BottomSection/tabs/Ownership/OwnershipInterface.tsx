export interface stockOwnerShipListInterface {
	investor_name: string
	put_or_call_or_share: string
	investment_discretion: string
	ownership_percentage: number
	weightage: number
	change_in_weightage_percentage: number
	shares: number
	change_in_shares_percentage: number
	holding_period: number
}
export interface HoldingAnalysisResponseInterface {
	date: string
	institution: string
	total_inst_investors: string
	total_investors_holding_change: string
	change_since_last_qrt_of_inst_investors: string
	shares: string
	total_shares_change: string
	change_since_last_qrt_of_share: string
	ownership: string
	change_since_last_qrt_of_ownership: string
	positions: string
	new_positions_change: string
	total_increased_positions: string
	change_since_last_qrt_of_positions: string
	increased_positions: string
	total_increased_positions_change: string
	change_since_last_qrt_of_increased_positions: string
	closed_positions: string
	total_closed_positions_change: string
	change_since_last_qrt_of_closed_positions: string
	reduced_positions: string
	total_reduced_positions_change: string
	change_since_last_qrt_of_reduced_positions: string
	calls: string
	total_calls: string
	change_since_last_qrt_of_total_calls: string
	puts: string
	total_puts_change: string
	change_since_last_qrt_of_puts: string
	put_call_ratio: string
	put_call_ratio_change: string
	change_since_last_qrt_of_put_call_ratio: string
}
export interface MutualFundResponseInterface {
	holder: string
	shares: string
	date_reported: string
	change: string
	weight_percent: string
}

export interface InsiderTradingSummaryResponseInterface {
	"half yearly": {
		total_share_purchase: number
		total_share_purchase_transactions: number
		total_share_sales: number
		total_share_sales_transactions: number
		net_share_purchase: number
		total_insider_shares: number
		net_share_purchase_percentage: number
	}
	annually: {
		total_share_purchase: number
		total_share_purchase_transactions: number
		total_share_sales: number
		total_share_sales_transactions: number
		net_share_purchase: number
		total_insider_shares: number
		net_share_purchase_percentage: number
	}
}

export interface getInsiderTradingHistoryResponseInterface {
	transaction_date: string
	reporting_name: string
	company_cik: string
	acquisition_or_disposition: string
	securities_owned: string
	securities_transacted: string
	filing_date: string
	link: string
	reporting_cik: string
	transaction_type: string
	owner_type: string
	form_type: string
	price: string
	security_name: string
}

export interface SenateTradingResponseInterface {
	transaction_date: string
	first_name: string
	last_name: string
	office: string
	owner: string
	asset_description: string
	asset_type: string
	type: string
	amount: string
	date_received: string
	comment: string
	link: string
}

export interface GetLastReportedOwnershipDataResponseInterface {
	reporting_date: string
	total_change_in_ownership: string
	total_no_of_institutions: string
	total_ownership: string
	total_shares: string
}
