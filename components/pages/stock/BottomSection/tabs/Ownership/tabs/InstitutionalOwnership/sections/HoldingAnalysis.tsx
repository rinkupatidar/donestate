import { motion } from "framer-motion"
import { useState } from "react"
import useFetch from "../../../../../../../../../hooks/useFetch"
import { addOverflowStyle } from "../../../../../../../../../utilities/addOverflowStyle"
import convertNumberToReadable from "../../../../../../../../../utilities/convertNumberToReadable"
import LoadingSection from "../../../../../../../../Loader/LoadingSection"
import Grid from "../../../../../../../../Overview/Grid"
import Value from "../../../../../../../../Overview/Value"
import { HoldingAnalysisResponseInterface } from "../../../OwnershipInterface"
import styles from "./index.module.scss"

const cols = "100px repeat(31, 150px)"
interface HoldingAnalysisProps {
	symbol: string
}
export default function HoldingAnalysis({ symbol }: HoldingAnalysisProps) {
	const [page, setPage] = useState(1)
	const [data, isLoading, setData] = useFetch<HoldingAnalysisResponseInterface[]>(
		"getHoldingAnalysisList",
		{ symbol, page_no: page },
		{
			initialData: [],
			handleResponse: (newData): any => [...data, ...newData],
		}
	)
	return (
		<div className={styles.holding_analysis}>
			<p>Holdings analysis</p>
			<div className="sticky_wrapper fill-width">
				<Grid isInfo className="fit-content is-capitalized sticky_info" gridColumns={cols}>
					<Value className="has-text-left sticky_tab is_info">date</Value>
					<Value title="institution" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						institution
					</Value>
					<Value title="total inst investors" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						total inst investors
					</Value>
					<Value title="total investors holding change" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						total investors holding change
					</Value>
					<Value title="change since last qrt of inst investors" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						change since last qrt of inst investors
					</Value>
					<Value title="shares" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						shares
					</Value>
					<Value title="total shares change" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						total shares change
					</Value>
					<Value title="change since last qrt of share" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						change since last qrt of share
					</Value>
					<Value title="ownership" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						ownership
					</Value>
					<Value title="change since last qrt of ownership" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						change since last qrt of ownership
					</Value>
					<Value title="positions" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						positions
					</Value>
					<Value title="new positions change" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						new positions change
					</Value>
					<Value title="total increased positions" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						total increased positions
					</Value>
					<Value title="change since last qrt of positions" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						change since last qrt of positions
					</Value>
					<Value title="increased positions" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						increased positions
					</Value>
					<Value title="total increased positions change" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						total increased positions change
					</Value>
					<Value title="change since last qrt of increased positions" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						change since last qrt of increased positions
					</Value>
					<Value title="closed positions" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						closed positions
					</Value>
					<Value title="total closed positions change" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						total closed positions change
					</Value>
					<Value title="change since last qrt of closed positions" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						change since last qrt of closed positions
					</Value>
					<Value title="reduced positions" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						reduced positions
					</Value>
					<Value title="total reduced positions change" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						total reduced positions change
					</Value>
					<Value title="change since last qrt of reduced positions" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						change since last qrt of reduced positions
					</Value>
					<Value title="calls" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						calls
					</Value>
					<Value title="total calls" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						total calls
					</Value>
					<Value title="change since last qrt of total calls" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						change since last qrt of total calls
					</Value>
					<Value title="puts" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						puts
					</Value>
					<Value title="total puts change" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						total puts change
					</Value>
					<Value title="change since last qrt of puts" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						change since last qrt of puts
					</Value>
					<Value title="put call ratio" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						put call ratio
					</Value>
					<Value title="put call ratio change" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						put call ratio change
					</Value>
					<Value title="change since last qrt of put call ratio" spanStyle={{ ...addOverflowStyle("80%"), float: "right" }}>
						change since last qrt of put call ratio
					</Value>
				</Grid>

				{data.map((data, idx) => (
					<Grid className="fit-content" gridColumns={cols} key={idx}>
						<Value className="has-text-left sticky_tab">{data.date}</Value>
						<Value className="is-family-secondary">{data.institution}</Value>
						<Value className="is-family-secondary">{data.total_inst_investors}</Value>
						<Value className="is-family-secondary">{data.total_investors_holding_change}</Value>
						<Value className="is-family-secondary">{data.change_since_last_qrt_of_inst_investors}</Value>
						<Value className="is-family-secondary">{convertNumberToReadable(data.shares)}</Value>
						<Value className="is-family-secondary">{data.total_shares_change}</Value>
						<Value className="is-family-secondary">{data.change_since_last_qrt_of_share}</Value>
						<Value className="is-family-secondary">{data.ownership}</Value>
						<Value className="is-family-secondary">{data.change_since_last_qrt_of_ownership}</Value>
						<Value className="is-family-secondary">{data.positions}</Value>
						<Value className="is-family-secondary">{data.new_positions_change}</Value>
						<Value className="is-family-secondary">{data.total_increased_positions}</Value>
						<Value className="is-family-secondary">{data.change_since_last_qrt_of_positions}</Value>
						<Value className="is-family-secondary">{data.increased_positions}</Value>
						<Value className="is-family-secondary">{data.total_increased_positions_change}</Value>
						<Value className="is-family-secondary">{data.change_since_last_qrt_of_increased_positions}</Value>
						<Value className="is-family-secondary">{data.closed_positions}</Value>
						<Value className="is-family-secondary">{data.total_closed_positions_change}</Value>
						<Value className="is-family-secondary">{data.change_since_last_qrt_of_closed_positions}</Value>
						<Value className="is-family-secondary">{data.reduced_positions}</Value>
						<Value className="is-family-secondary">{data.total_reduced_positions_change}</Value>
						<Value className="is-family-secondary">{data.change_since_last_qrt_of_reduced_positions}</Value>
						<Value className="is-family-secondary">{convertNumberToReadable(data.calls)}</Value>
						<Value className="is-family-secondary">{convertNumberToReadable(data.total_calls)}</Value>
						<Value className="is-family-secondary">{data.change_since_last_qrt_of_total_calls}</Value>
						<Value className="is-family-secondary">{convertNumberToReadable(data.puts)}</Value>
						<Value className="is-family-secondary">{data.total_puts_change}</Value>
						<Value className="is-family-secondary">{data.change_since_last_qrt_of_puts}</Value>
						<Value className="is-family-secondary">{data.put_call_ratio}</Value>
						<Value className="is-family-secondary">{data.put_call_ratio_change}</Value>
						<Value className="is-family-secondary">{data.change_since_last_qrt_of_put_call_ratio}</Value>
					</Grid>
				))}
				<motion.div onViewportEnter={() => setPage(page + 1)}>
					<LoadingSection disableSection className="mt-3" />
				</motion.div>
			</div>
		</div>
	)
}
