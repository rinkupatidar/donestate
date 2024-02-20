export interface PriceTargetListInterface {
	adj_price_target: number;
	analyst_name: any;
	order: number;
	price_target: number;
	price_when_posted: number;
	published_date: number;
	analyst_company: string;
	news_publisher: string;
	news_source: string;
	news_title: string;
	news_url: string;
}
export interface PriceTargetSummaryInterface {
	all_time?: number;
	all_time_avg_price_target?: number;
	last_month?: number;
	last_month_avg_price_target?: number;
	last_qtr?: number;
	last_qtr_avg_price_target?: number;
	last_year?: number;
	last_year_avg_price_target?: number;
	publishers?: any;
}

export interface SummaryInterface {
	buy: number;
	consensus: string;
	hold: number;
	sell: number;
	strong_buy: number;
	strong_sell: number;
}

export interface EstimatesListInterface {
	date: string;
	estimatedEbitAvg: number;
	estimatedEbitHigh: number;
	estimatedEbitLow: number;
	estimatedEbitdaAvg: number;
	estimatedEbitdaHigh: number;
	estimatedEbitdaLow: number;
	estimatedEpsAvg: number;
	estimatedEpsHigh: number;
	estimatedEpsLow: number;
	estimatedNetIncomeAvg: number;
	estimatedNetIncomeHigh: number;
	estimatedNetIncomeLow: number;
	estimatedRevenueAvg: number;
	estimatedRevenueHigh: number;
	estimatedRevenueLow: number;
	estimatedSgaExpenseAvg: number;
	estimatedSgaExpenseHigh: number;
	estimatedSgaExpenseLow: number;
	numberAnalystEstimatedRevenue: number;
	numberAnalystsEstimatedEps: number;
}

export interface EarningSurpriseInterface {
	date: string;
	actual: number;
	estimated: number;
	surprise: number;
}

export interface UpgradesAndDowngradesInterface {
	action: string;
	analyst_company: string;
	new_rating: string;
	news_base_url: string;
	news_publisher: string;
	news_title: string;
	news_url: string;
	previous_rating: string;
	price_when_posted: number;
	published_date: number;
}
export interface RatingSummaryInterface {
	consensus: string;
	buy: number;
	hold: number;
	sell: number;
	strong_buy: number;
	strong_sell: number;
}
