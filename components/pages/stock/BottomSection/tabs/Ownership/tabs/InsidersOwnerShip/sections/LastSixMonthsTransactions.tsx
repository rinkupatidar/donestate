import useFetch from "../../../../../../../../../hooks/useFetch"
import { addOverflowStyle } from "../../../../../../../../../utilities/addOverflowStyle"
import LoadingSection from "../../../../../../../../Loader/LoadingSection"
import Grid from "../../../../../../../../Overview/Grid"
import Value from "../../../../../../../../Overview/Value"
import { InsiderTradingSummaryResponseInterface } from "../../../OwnershipInterface"
import styles from "./index.module.scss"

const cols = "200px .5fr 1fr"
interface Props {
	symbol: string
}
export default function LastSixMonthsTransactions({ symbol }: Props) {
	const [data, isLoading, setData] = useFetch<InsiderTradingSummaryResponseInterface>("getInsiderTradingSummary", { symbol })
	if (isLoading) return <LoadingSection />
	return (
		<>
			<div className={styles.holding_analysis}>
				<p>Last 6 months transactions</p>
				<div className="sticky_wrapper fill-width">
					<Grid isInfo className="is-capitalized" gridColumns={cols}>
						<Value> </Value>
						<Value>Shares </Value>
						<Value># of transactions</Value>
					</Grid>

					<Grid gridColumns={cols}>
						<Value spanStyle={addOverflowStyle()} title="Purchases" className="has-text-left">
							Purchases
						</Value>
						<Value className="is-family-secondary">{data["half yearly"].total_share_purchase}</Value>
						<Value className="is-family-secondary">{data["half yearly"].total_share_purchase_transactions}</Value>
					</Grid>
					<Grid gridColumns={cols}>
						<Value spanStyle={addOverflowStyle()} title="Sales" className="has-text-left">
							Sales
						</Value>
						<Value className="is-family-secondary">{data["half yearly"].total_share_sales}</Value>
						<Value className="is-family-secondary">{data["half yearly"].total_share_sales_transactions}</Value>
					</Grid>
					<Grid gridColumns={cols}>
						<Value spanStyle={addOverflowStyle()} title="Net Shares Purchases(Sold)" className="has-text-left">
							Net Shares Purchases(Sold)
						</Value>
						<Value className="is-family-secondary">{data["half yearly"].net_share_purchase}</Value>
						<Value className="is-family-secondary">{data["half yearly"].net_share_purchase_percentage}</Value>
					</Grid>
					<Grid gridColumns={cols}>
						<Value spanStyle={addOverflowStyle()} title="Total Insider Shares" className="has-text-left">
							Total Insider Shares
						</Value>
						<Value className="is-family-secondary">{data["half yearly"].total_insider_shares}</Value>
						<Value className="is-family-secondary">-</Value>
					</Grid>
					<Grid gridColumns={cols}>
						<Value spanStyle={addOverflowStyle()} title="% Net shares Purchased" className="has-text-left">
							% Net shares Purchased
						</Value>
						<Value className="is-family-secondary">{data["half yearly"].net_share_purchase_percentage}</Value>
						<Value className="is-family-secondary">-</Value>
					</Grid>
				</div>
			</div>
			<div className={`${styles.holding_analysis} mt-3`}>
				<p>Last 12 months transactions</p>
				<div className="sticky_wrapper fill-width">
					<Grid isInfo className="is-capitalized" gridColumns={cols}>
						<Value> </Value>
						<Value>Shares </Value>
						<Value># of transactions</Value>
					</Grid>

					<Grid gridColumns={cols}>
						<Value spanStyle={addOverflowStyle()} title="Purchases" className="has-text-left">
							Purchases
						</Value>
						<Value className="is-family-secondary">{data["annually"].total_share_purchase}</Value>
						<Value className="is-family-secondary">{data["annually"].total_share_purchase_transactions}</Value>
					</Grid>
					<Grid gridColumns={cols}>
						<Value spanStyle={addOverflowStyle()} title="Sales" className="has-text-left">
							Sales
						</Value>
						<Value className="is-family-secondary">{data["annually"].total_share_sales}</Value>
						<Value className="is-family-secondary">{data["annually"].total_share_sales_transactions}</Value>
					</Grid>
					<Grid gridColumns={cols}>
						<Value spanStyle={addOverflowStyle()} title="Net Shares Purchases(Sold)" className="has-text-left">
							Net Shares Purchases(Sold)
						</Value>
						<Value className="is-family-secondary">{data["annually"].net_share_purchase}</Value>
						<Value className="is-family-secondary">{data["annually"].net_share_purchase_percentage}</Value>
					</Grid>
					<Grid gridColumns={cols}>
						<Value spanStyle={addOverflowStyle()} title="Total Insider Shares" className="has-text-left">
							Total Insider Shares
						</Value>
						<Value className="is-family-secondary">{data["annually"].total_insider_shares}</Value>
						<Value className="is-family-secondary">-</Value>
					</Grid>
					<Grid gridColumns={cols}>
						<Value spanStyle={addOverflowStyle()} title="% Net shares Purchased" className="has-text-left">
							% Net shares Purchased
						</Value>
						<Value className="is-family-secondary">{data["annually"].net_share_purchase_percentage}</Value>
						<Value className="is-family-secondary">-</Value>
					</Grid>
				</div>
			</div>
		</>
	)
}
