import { motion } from "framer-motion"
import { useState } from "react"
import useFetch from "../../../../../../../../../hooks/useFetch"
import { addOverflowStyle } from "../../../../../../../../../utilities/addOverflowStyle"
import LoadingSection from "../../../../../../../../Loader/LoadingSection"
import Grid from "../../../../../../../../Overview/Grid"
import Value from "../../../../../../../../Overview/Value"
import { getInsiderTradingHistoryResponseInterface } from "../../../OwnershipInterface"
import styles from "./index.module.scss"

const cols = "repeat(6, 100px) 200px"
interface HoldingAnalysisProps {
	symbol: string
}
export default function InsidersOwnerShipTab({ symbol }: HoldingAnalysisProps) {
	const [page, setPage] = useState(1)
	const [data, isLoading, setData] = useFetch<getInsiderTradingHistoryResponseInterface[]>(
		"getInsiderTradingHistory",
		{ symbol, page_no: page },
		{
			initialData: [],
			handleResponse: (newData): any => [...data, ...newData],
		}
	)
	return (
		<div className={styles.holding_analysis} style={{ height: "400px" }}>
			<p>Insiders Ownership</p>

			<div className="sticky_wrapper fill-width ">
				<Grid isInfo className="is-capitalized sticky_info fit-content" gridColumns={cols}>
					<Value title="Transaction date" className="has-text-left" spanStyle={{ ...addOverflowStyle() }}>
						Trans. date
					</Value>
					<Value title="Name" className="has-text-left" spanStyle={{ ...addOverflowStyle() }}>
						Name
					</Value>
					<Value title="Reporting CIK" spanStyle={{ ...addOverflowStyle() }}>
						Reporting CIK
					</Value>
					<Value title="Acquisition (A)/ Disposition (D)" spanStyle={{ ...addOverflowStyle() }}>
						Acquisition (A)/ Disposition (D)
					</Value>
					<Value title="Shares owned" spanStyle={{ ...addOverflowStyle() }}>
						Shares owned
					</Value>
					<Value title="Shares transacted" spanStyle={{ ...addOverflowStyle() }}>
						Shares transacted
					</Value>
					<Value title="Source" spanStyle={{ ...addOverflowStyle() }}>
						Source
					</Value>
				</Grid>

				{data.map((data, idx) => (
					<Grid className="fit-content" gridColumns={cols} key={idx}>
						<Value className="has-text-left">{data.transaction_date}</Value>
						<Value className="has-text-left" spanStyle={{ ...addOverflowStyle() }}>
							{data.reporting_name}
						</Value>
						<Value className="is-family-secondary">{data.reporting_cik}</Value>
						<Value className="is-family-secondary">{data.acquisition_or_disposition}</Value>
						<Value className="is-family-secondary">{data.securities_owned}</Value>
						<Value className="is-family-secondary">{data.securities_transacted}</Value>
						<Value spanStyle={{ ...addOverflowStyle(), float: "right" }} className="is-family-secondary">
							<a className="has-text-warning" href={data.link} target="_blank" rel="noreferrer">
								{data.link}
							</a>
						</Value>
					</Grid>
				))}
				<motion.div onViewportEnter={() => setPage(page + 1)}>
					<LoadingSection disableSection className="mt-3" />
				</motion.div>
			</div>
		</div>
	)
}
