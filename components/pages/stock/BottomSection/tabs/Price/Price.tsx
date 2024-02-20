import dayjs from "dayjs"
import { AnimatePresence } from "framer-motion"
import { useState } from "react"
import useFetch from "../../../../../../hooks/useFetch"
import { round } from "../../../../../../utilities/round"
import Button from "../../../../../Button/Button"
import HoriSelectList from "../../../../../HoriSelectList/HoriSelectList"
import Icon from "../../../../../Icon/Icon"
import LoadingSection from "../../../../../Loader/LoadingSection"
import Grid from "../../../../../Overview/Grid"
import Value from "../../../../../Overview/Value"
import DownloadPriceModal from "./DownloadPriceModal"
import { getAllHistoricalDataResponseInterface } from "./PriceTypes"
import styles from "./index.module.scss"

interface PriceProps {
	symbol: string
}
const gridColumnsVal = "1.8fr .7fr .7fr .7fr .7fr 1fr"

const Price = ({ symbol }: PriceProps) => {
	const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false)
	const [selectedYear, setSelectedYear] = useState("")
	const [selectedMonth, setSelectedMonth] = useState("")
	const [data, isLoading] = useFetch<getAllHistoricalDataResponseInterface>(
		"getAllHistoricalStockDataGroupWise",
		{ symbol },
		{
			shouldFetch: !!symbol,
			initialData: {},
			handleResponse(val) {
				const years = Object.keys(val)
				const fYear = years[years.length - 1]

				const months = Object.keys(val[fYear])
				const fMonth = months[0]

				setSelectedYear(fYear)
				setSelectedMonth(fMonth)
				return val
			},
		}
	)

	const handleSelectYear = (newSelectedYear: string) => {
		const monthList = data?.[newSelectedYear] ? Object.keys(data?.[newSelectedYear]).reverse() : []
		setSelectedMonth(monthList[0])
		setSelectedYear(newSelectedYear)
	}

	const yearList = Object.keys(data).reverse()
	const monthList = data?.[selectedYear]
		? Object.keys(data?.[selectedYear])
				.reverse()
				.map((val) => ({ displayValue: val.slice(0, 3), value: val }))
		: []

	return (
		<div className={styles.container}>
			<AnimatePresence>{isDownloadModalOpen && <DownloadPriceModal symbol={symbol} close={() => setIsDownloadModalOpen(false)} />}</AnimatePresence>
			<AnimatePresence>
				{isLoading ? (
					<LoadingSection />
				) : (
					<div>
						<div>
							<HoriSelectList value={selectedYear} onClick={handleSelectYear} dataArr={yearList} layoutId="selectedYear" />
						</div>
						<div className="is-flex is-align-items-center is-justify-content-space-between">
							<div className="my-2">
								<HoriSelectList value={selectedMonth.slice(0, 3)} onClick={(val) => setSelectedMonth(val.value)} dataArr={monthList} layoutId="selectedMonth" />
							</div>

							<Button onClick={() => setIsDownloadModalOpen(true)} size="small" className="is-warning">
								<Icon src="download.svg" />
								<span>Download</span>
							</Button>
						</div>

						<Table data={data[selectedYear][selectedMonth]} />
					</div>
				)}
			</AnimatePresence>
		</div>
	)
}
export default Price

const Table = ({ data }: any) => {
	const middleIdx = Math.ceil(data.length / 2)
	const fHalf = data.slice(0, middleIdx)
	const lHalf = data.slice(middleIdx, data.length)

	return (
		<div className="columns mt-4">
			<div className="column is-6">
				<div className="v_data_section fill-height">
					<Grid isInfo gridColumns={gridColumnsVal}>
						<Value className="has-text-left">Date</Value>
						<Value>Open</Value>
						<Value>High</Value>
						<Value>Low</Value>
						<Value>Close</Value>
						<Value>Vol '000</Value>
					</Grid>
					{fHalf.map((item, idx) => (
						<Grid gridColumns={gridColumnsVal} key={idx}>
							<Value className="has-text-left">{dayjs(item.date).format("D MMM, YYYY")}</Value>
							<Value className="is-family-secondary">{round(item.open)}</Value>
							<Value className="is-family-secondary">{round(item.high)}</Value>
							<Value className="is-family-secondary">{round(item.low)}</Value>
							<Value className="is-family-secondary">{round(item.close)}</Value>
							<Value className="is-family-secondary">{item.volume / 1000}</Value>
						</Grid>
					))}
				</div>
			</div>
			<div className="column is-6">
				<div className="v_data_section fill-height">
					<Grid isInfo gridColumns={gridColumnsVal}>
						<Value className="has-text-left">Date</Value>
						<Value>Open</Value>
						<Value>High</Value>
						<Value>Low</Value>
						<Value>Close</Value>
						<Value>Vol '000</Value>
					</Grid>
					{lHalf.map((item, idx) => (
						<Grid gridColumns={gridColumnsVal} key={idx}>
							<Value className="has-text-left">{dayjs(item.date).format("D MMM, YYYY")}</Value>
							<Value className="is-family-secondary">{round(item.open)}</Value>
							<Value className="is-family-secondary">{round(item.high)}</Value>
							<Value className="is-family-secondary">{round(item.low)}</Value>
							<Value className="is-family-secondary">{round(item.close)}</Value>
							<Value className="is-family-secondary">{item.volume / 1000}</Value>
						</Grid>
					))}
				</div>
			</div>
		</div>
	)
}
