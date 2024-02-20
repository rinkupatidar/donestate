import { motion } from "framer-motion"
import { useState } from "react"
import useFetch from "../../../../../../../../../hooks/useFetch"
import { addOverflowStyle } from "../../../../../../../../../utilities/addOverflowStyle"
import LoadingSection from "../../../../../../../../Loader/LoadingSection"
import Grid from "../../../../../../../../Overview/Grid"
import Value from "../../../../../../../../Overview/Value"
import { SenateTradingResponseInterface } from "../../../OwnershipInterface"
import styles from "./index.module.scss"

const cols = "repeat(7, 1fr) 200px"
interface Props {
	symbol: string
}
export default function SenateTradingTab({ symbol }: Props) {
	const [page, setPage] = useState(1)
	const [data, isLoading, setData] = useFetch<SenateTradingResponseInterface[]>(
		"getSenateTradings",
		{ symbol, page_no: page },
		{
			initialData: [],
			handleResponse: (newData): any => [...data, ...newData],
		}
	)
	return (
		<div className={styles.holding_analysis} style={{ height: "600px" }}>
			<p>Insiders Ownership</p>

			<div className="sticky_wrapper">
				<Grid isInfo className="is-capitalized sticky_info" gridColumns={cols}>
					<Value className="has-text-left">Tran Date</Value>
					<Value>First Name</Value>
					<Value>Last Name</Value>
					<Value>Office</Value>
					<Value>Owner</Value>
					<Value>Type</Value>
					<Value>Amount</Value>
					<Value>Comment Source</Value>
				</Grid>

				{data.map((data, idx) => (
					<Grid gridColumns={cols} key={idx}>
						<Value className="has-text-left">{data.transaction_date}</Value>
						<Value title={data.first_name}>{data.first_name}</Value>
						<Value title={data.last_name}>{data.last_name}</Value>
						<Value title={data.office} spanStyle={{ ...addOverflowStyle("150px"), float: "right" }}>
							{data.office}
						</Value>
						<Value title={data.owner}>{data.owner}</Value>
						<Value title={data.asset_description}>{data.type}</Value>
						<Value title={data.amount}>{data.amount}</Value>
						<Value title={data.link} spanStyle={{ ...addOverflowStyle(), float: "right" }}>
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
