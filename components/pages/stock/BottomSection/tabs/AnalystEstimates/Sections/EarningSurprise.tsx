import { AnimatePresence } from "framer-motion"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import indicators from "highcharts/indicators/indicators"
import dataModule from "highcharts/modules/data"
import exportingModule from "highcharts/modules/exporting"
import { useEffect, useRef, useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { AXIOS_INSTANCE, IS_CLIENT } from "../../../../../../../constants"
import { GREEN, GREY_DARK, RED, YELLOW } from "../../../../../../../highcharts-styling-config"
import Button from "../../../../../../Button/Button"
import Icon from "../../../../../../Icon/Icon"
import LoaderOverlay from "../../../../../../Loader/LoaderOverlay"
import PrimaryLoader from "../../../../../../Loader/PrimaryLoader"
import Grid from "../../../../../../Overview/Grid"
import Value from "../../../../../../Overview/Value"
import { EarningSurpriseInterface } from "../AnalystEstimatesTypes"
import styles from "./index.module.scss"

interface EarningSurpriseProps {
	symbol: string
}
const COLUMNS = "1fr 1fr 1fr 1fr 1fr"
const EarningSurprise = ({ symbol }: EarningSurpriseProps) => {
	const [page, setPage] = useState(1)
	const [idx, _setIdx] = useState(4)
	const [range, setRange] = useState([0, 4])
	const [isLoading, setIsLoading] = useState(false)
	const [data, setData] = useState<EarningSurpriseInterface[]>([])

	useEffect(() => {
		;(async () => {
			const res = await AXIOS_INSTANCE.get("getEarningsSurprisesList", { params: { symbol, page_no: page } })
			const updatedData = [...data]
			updatedData.push(...res.data)
			setData(updatedData)
		})()
	}, [page])

	// const [data, isLoading] = useFetch<EarningSurpriseInterface[] | undefined>(
	// 	"",
	// 	{
	// 		symbol,
	// 		page_no: page,
	// 	},
	// 	{ shouldShowLoadingOnRefetch: true }
	// );
	const setIdx = (incr: number) => {
		const newIdx = idx + incr
		_setIdx(newIdx)
		setRange([newIdx - 4, newIdx])
		if (incr > 0) setPage(Math.ceil(newIdx / 4))
	}
	const newData = data.slice(...range)

	return (
		<div className={styles.earnings_surprises}>
			<AnimatePresence>{isLoading && <LoaderOverlay />}</AnimatePresence>
			<p className="section-title">Earnings Surprise</p>
			<Grid gridColumns={COLUMNS}>
				<Value> </Value>
				{data?.slice(...range).map(({ date }) => (
					<Value key={date}>{date}</Value>
				))}
			</Grid>
			<Grid gridColumns={COLUMNS}>
				<Value className="has-text-left">Actuals</Value>
				{data?.slice(...range).map(({ actual }, i) => (
					<Value secFont key={i}>
						{actual}
					</Value>
				))}
			</Grid>
			<Grid gridColumns={COLUMNS}>
				<Value className="has-text-left">Estimates </Value>
				{data?.slice(...range).map(({ estimated }, i) => (
					<Value secFont key={i}>
						{estimated}
					</Value>
				))}
			</Grid>
			<Grid gridColumns={COLUMNS}>
				<Value className="has-text-left">Surprise </Value>
				{data?.slice(...range).map(({ surprise }, i) => (
					<Value secFont key={i}>
						{surprise}
					</Value>
				))}
			</Grid>
			<Grid gridColumns={COLUMNS}>
				<Value className="has-text-left">Graph </Value>
				<div className={styles.chart_wrapper}>
					<Chart data={data.slice(...range)} />
				</div>
			</Grid>
			<div className="tags is-right">
				<div data-disabled={page === 1} onClick={() => setIdx(-1)} className="tag is-warning">
					<Icon className="is-small">
						<FaChevronLeft />
					</Icon>
				</div>
				<Button onClick={() => setIdx(1)} className="tag is-warning">
					<Icon className="is-small">
						<FaChevronRight />
					</Icon>
				</Button>
			</div>
		</div>
	)
}
export default EarningSurprise

if (IS_CLIENT) {
	indicators(Highcharts)
	dataModule(Highcharts)
	exportingModule(Highcharts)
}

const defaultOptions: Highcharts.Options = {
	chart: { backgroundColor: "transparent", height: "80px" },
	title: { text: "" },
	xAxis: { labels: { enabled: false }, title: { text: "" }, gridLineColor: GREY_DARK },
	yAxis: { labels: { enabled: false }, title: { text: "" }, gridLineColor: GREY_DARK },
	legend: { enabled: false },
	exporting: { enabled: false },
	tooltip: {
		formatter: function () {
			return `${this.series.name}: ${this.y}`
		},
	},
}
const Chart = ({ data }: { data: EarningSurpriseInterface[] | undefined }) => {
	const chartRef = useRef<HighchartsReact.RefObject>(null)
	if (!data || !!!data.length) return <PrimaryLoader />

	const series: Highcharts.Series = [
		{
			name: "Actuals",
			data: [data?.[0]?.actual, data?.[1]?.actual, data?.[2]?.actual, data?.[3]?.actual],
			color: GREEN,
		},
		{
			name: "Estimates",
			data: [data?.[0]?.estimated, data?.[1]?.estimated, data?.[2]?.estimated, data?.[3]?.estimated],
			color: YELLOW,
		},
		{
			name: "Surprise",
			data: [data?.[0]?.surprise, data?.[1]?.surprise, data?.[2]?.surprise, data?.[3]?.surprise],
			color: RED,
		},
	]

	return <HighchartsReact highcharts={Highcharts} options={{ ...defaultOptions, series }} ref={chartRef} />
}
