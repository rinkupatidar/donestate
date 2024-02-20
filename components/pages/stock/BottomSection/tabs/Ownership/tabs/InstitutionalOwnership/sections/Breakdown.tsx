import { motion } from "framer-motion"
import { useState } from "react"
import useFetch from "../../../../../../../../../hooks/useFetch"
import { addOverflowStyle } from "../../../../../../../../../utilities/addOverflowStyle"
import convertNumberToReadable from "../../../../../../../../../utilities/convertNumberToReadable"
import { round } from "../../../../../../../../../utilities/round"
import LoadingSection from "../../../../../../../../Loader/LoadingSection"
import Grid from "../../../../../../../../Overview/Grid"
import Value from "../../../../../../../../Overview/Value"
import { stockOwnerShipListInterface } from "../../../OwnershipInterface"
import styles from "./index.module.scss"

const cols = "200px repeat(8, 100px)"
interface HoldingAnalysisProps {
	symbol: string
}
export default function Breakdown({ symbol }: HoldingAnalysisProps) {
	const [page, setPage] = useState(1)
	const [data, isLoading, setData] = useFetch<stockOwnerShipListInterface[]>(
		"getStockOwnershipList",
		{ symbol, page_no: page },
		{
			initialData: [],

			handleResponse: (newData): any => [...data, ...newData],
		}
	)
	return (
		<div className={styles.holding_analysis}>
			<p className="">Breakdown of Stock Ownership</p>
			<div className="sticky_wrapper fill-width">
				<Grid isInfo className="fit-content is-capitalized sticky_info" gridColumns={cols}>
					<Value className="has-text-left sticky_tab is_info">Investor name</Value>
					<Value title="Ownership %" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						Ownership %
					</Value>
					<Value title="Put/Call/Shares " spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						Put/Call/Shares{" "}
					</Value>
					<Value title="Investment Discretion " spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						Investment Discretion{" "}
					</Value>
					<Value title="Weightage " spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						Weightage{" "}
					</Value>
					<Value title="% change " spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						% change{" "}
					</Value>
					<Value title="# of Shares " spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						# of Shares{" "}
					</Value>
					<Value title="Change in # of shares " spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						Change in # of shares{" "}
					</Value>
					<Value title="Holding period " spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						Holding period{" "}
					</Value>
				</Grid>

				{data.map((data, idx) => (
					<Grid className="fit-content" gridColumns={cols} key={idx}>
						<Value title={data.investor_name} spanStyle={addOverflowStyle()} className="has-text-left sticky_tab">
							{data.investor_name}
						</Value>
						<Value className="is-family-secondary">{round(data.ownership_percentage)}</Value>
						<Value className="is-family-secondary">{data.put_or_call_or_share}</Value>
						<Value className="is-family-secondary">{data.investment_discretion}</Value>
						<Value className="is-family-secondary">{round(data.weightage)}</Value>
						<Value className="is-family-secondary">{round(data.change_in_weightage_percentage)}</Value>
						<Value className="is-family-secondary">{convertNumberToReadable(data.shares)}</Value>
						<Value className="is-family-secondary">{round(data.change_in_shares_percentage)}</Value>
						<Value className="is-family-secondary">{data.holding_period}</Value>
					</Grid>
				))}
				<motion.div onViewportEnter={() => setPage(page + 1)}>
					<LoadingSection disableSection className="mt-3" />
				</motion.div>
			</div>
		</div>
	)
}
