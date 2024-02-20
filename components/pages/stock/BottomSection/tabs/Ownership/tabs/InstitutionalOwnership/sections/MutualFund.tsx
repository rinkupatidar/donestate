import { motion } from "framer-motion"
import { useState } from "react"
import useFetch from "../../../../../../../../../hooks/useFetch"
import { addOverflowStyle } from "../../../../../../../../../utilities/addOverflowStyle"
import LoadingSection from "../../../../../../../../Loader/LoadingSection"
import Grid from "../../../../../../../../Overview/Grid"
import Value from "../../../../../../../../Overview/Value"
import { MutualFundResponseInterface } from "../../../OwnershipInterface"
import styles from "./index.module.scss"

const cols = "250px repeat(4, 1fr)"
interface MutualFundProps {
	symbol: string
}
export default function MutualFundHoldings({ symbol }: MutualFundProps) {
	const [page, setPage] = useState(1)
	const [data, isLoading, setData] = useFetch<MutualFundResponseInterface[]>(
		"getMutualFundHoldings",
		{ symbol, page_no: page },
		{ initialData: [], handleResponse: (newData): any => [...data, ...newData] }
	)
	return (
		<div className={styles.holding_analysis}>
			<p>Mutual Funds Holdings</p>
			<div className="sticky_wrapper fill-width">
				<Grid isInfo className="is-capitalized sticky_info" gridColumns={cols}>
					<Value className="has-text-left">holder</Value>
					<Value>shares</Value>
					<Value>date reported</Value>
					<Value>change</Value>
					<Value>weight percent</Value>
				</Grid>

				{data.map((data, idx) => (
					<Grid gridColumns={cols} key={idx}>
						<Value spanStyle={addOverflowStyle()} className="has-text-left">
							{data.holder}
						</Value>
						<Value className="is-family-secondary">{data.shares}</Value>
						<Value className="is-family-secondary">{data.date_reported}</Value>
						<Value className="is-family-secondary">{data.change}</Value>
						<Value className="is-family-secondary">{data.weight_percent}</Value>
					</Grid>
				))}
				<motion.div onViewportEnter={() => setPage(page + 1)}>
					<LoadingSection disableSection className="mt-3" />
				</motion.div>
			</div>
		</div>
	)
}
