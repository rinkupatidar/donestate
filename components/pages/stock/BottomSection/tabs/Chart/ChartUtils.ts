import { AXIOS_INSTANCE, DIVIDENDS_DISPLAY_VALUE, EARNINGS_DISPLAY_VALUE, SPLITS_DISPLAY_VALUE } from "../../../../../../constants";
import { ControlInterface } from "./ChartsWrapper";

interface handleFlagDataArgs {
	cache: Map<any, any>;
	defaultFirstSymbol: string;
	controls: ControlInterface[];
	startDate: any;
	endDate: any;
}
export async function handleFlagData({ cache, defaultFirstSymbol, controls, startDate, endDate }: handleFlagDataArgs) {
	// Dividends
	const dividends = controls.find(({ type, controlType }) => controlType === "flag" && type === DIVIDENDS_DISPLAY_VALUE);
	const dividendsCacheKey = `${startDate}_${endDate}_${DIVIDENDS_DISPLAY_VALUE}`;

	if (dividends && !cache.get(dividendsCacheKey)) {
		const data = (await AXIOS_INSTANCE.get("getAllHistoricalStockDividendData", { params: { symbol: defaultFirstSymbol, from: startDate, to: endDate } })).data;
		const updatedData = data.map((i: number[]) => ({
			x: i[0],
			title: "D",
			text: `Dividends ${i[1]}`,
		}));
		cache.set(dividendsCacheKey, updatedData);
	}

	// Earnings
	const earnings = controls.find(({ type, controlType }) => controlType === "flag" && type === EARNINGS_DISPLAY_VALUE);
	const earningsCacheKey = `${startDate}_${endDate}_${EARNINGS_DISPLAY_VALUE}`;

	if (earnings && !cache.get(earningsCacheKey)) {
		const data = (await AXIOS_INSTANCE.get("getAllHistoricalStockEarningData", { params: { symbol: defaultFirstSymbol, from: startDate, to: endDate } })).data;
		const updatedData = data.map((i: number[]) => ({
			x: i[0],
			title: "E",
			text: `Earnings ${i[1]}`,
		}));
		cache.set(earningsCacheKey, updatedData);
	}

	// Splits
	const splits = controls.find(({ type, controlType }) => controlType === "flag" && type === SPLITS_DISPLAY_VALUE);
	const splitsCacheKey = `${startDate}_${endDate}_${SPLITS_DISPLAY_VALUE}`;

	if (splits && !cache.get(splitsCacheKey)) {
		const data = (await AXIOS_INSTANCE.get("getAllHistoricalStockSplitData", { params: { symbol: defaultFirstSymbol, from: startDate, to: endDate } })).data;

		const updatedData = data.map((i: number[]) => ({
			x: i[0],
			title: "S",
			text: `Splits${i[1]}`,
		}));

		cache.set(splitsCacheKey, updatedData);
	}
}

interface getDataToPushInSeriesForFlagsArgs {
	type: string;
	cache: Map<any, any>;
	startDate: any;
	endDate: any;
	defaultFirstSymbol: string;
}
export function getDataToPushInSeriesForFlags({ type, cache, startDate, endDate, defaultFirstSymbol }: getDataToPushInSeriesForFlagsArgs): Highcharts.SeriesOptionsType {
	switch (type) {
		case DIVIDENDS_DISPLAY_VALUE:
			return {
				type: "flags",
				data: cache.get(`${startDate}_${endDate}_${DIVIDENDS_DISPLAY_VALUE}`),
				onSeries: defaultFirstSymbol,
			};
		case EARNINGS_DISPLAY_VALUE:
			return {
				type: "flags",
				data: cache.get(`${startDate}_${endDate}_${EARNINGS_DISPLAY_VALUE}`),
				onSeries: defaultFirstSymbol,
			};
		case SPLITS_DISPLAY_VALUE:
			return {
				type: "flags",
				data: cache.get(`${startDate}_${endDate}_${SPLITS_DISPLAY_VALUE}`),
				onSeries: defaultFirstSymbol,
			};
	}
}
