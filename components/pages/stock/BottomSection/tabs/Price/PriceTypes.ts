export interface getAllHistoricalDataResponseInterface {
	[key: string]: {
		[key: string]: {
			date: string;
			open: number;
			low: number;
			high: number;
			close: number;
			volume: number;
		}[];
	};
}
