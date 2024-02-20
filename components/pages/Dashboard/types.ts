export type WorldEquityMarketResponseType = {
	order: number;
	region_name: string;
	indexes: {
		order: number;
		index_name: string;
		index_symbol: string;
		country_name: string;
		real_time_data: {
			open: number;
			change: number;
			current_price: number;
			day_change_percentage: number;
			day_high: number;
			day_low: number;
		};
		captured_on: 1666924869;
	}[];
}[];

export type WorldCommoditiesResponseType = {
	order: number;
	type: string;
	items: {
		order: number;
		item_name: string;
		item_symbol: string;
		real_time_data: { change: number; current_price: number; day_change_percentage: number; day_high: number; day_low: number };
		captured_on: number;
	}[];
}[];

export type WorldCurrenciesResponseType = {
	order: number;
	region_name: string;
	currencies: {
		order: number;
		currency_pair: string;
		currency_pair_symbol: string;
		country_name: string;
		real_time_data: {
			open: number;
			current_price: number;
			change: number;
			day_change_percentage: number;
			day_high: number;
			day_low: number;
		};
		captured_on: number;
	}[];
}[];

export interface WebsocketResponseType {
	indexes: WorldEquityMarketResponseType;
	commodities: WorldCommoditiesResponseType;
	currencies: WorldCurrenciesResponseType;
	cryptos: any;
}
