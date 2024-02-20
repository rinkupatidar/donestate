import { AnimatePresence } from "framer-motion";
import useFetch from "../../../../../../../hooks/useFetch";
import { round } from "../../../../../../../utilities/round";
import LoaderOverlay from "../../../../../../Loader/LoaderOverlay";
import Grid from "../../../../../../Overview/Grid";
import Value from "../../../../../../Overview/Value";
import { PriceTargetSummaryInterface } from "../AnalystEstimatesTypes";
import styles from "./index.module.scss";

interface PriceTargetEstimatesProps {
	symbol: string;
}

const COLUMNS = "1fr 1fr 1fr";
const PriceTargetEstimates = ({ symbol }: PriceTargetEstimatesProps) => {
	const [data, isLoading] = useFetch<PriceTargetSummaryInterface | undefined>("getPriceTargetSummary", { symbol: symbol });
	return (
		<div className={styles.price_target_estimates}>
			<AnimatePresence>{isLoading && <LoaderOverlay />}</AnimatePresence>
			<p className="section-title">Price Target Estimates</p>
			<br />
			<Grid gridColumns={COLUMNS}>
				<Value> </Value>
				<Value>No of est. </Value>
				<Value> Price target's</Value>
			</Grid>
			<Grid gridColumns={COLUMNS}>
				<Value className="has-text-left">Last Month </Value>
				<Value secFont>{data?.last_month}</Value>
				<Value secFont>{round(data?.last_month_avg_price_target)}</Value>
			</Grid>
			<Grid gridColumns={COLUMNS}>
				<Value className="has-text-left">Lat Quater</Value>
				<Value secFont>{data?.last_qtr}</Value>
				<Value secFont>{round(data?.last_qtr_avg_price_target)}</Value>
			</Grid>
			<Grid gridColumns={COLUMNS}>
				<Value className="has-text-left">Last Year</Value>
				<Value secFont>{data?.last_year}</Value>
				<Value secFont>{round(data?.last_year_avg_price_target)}</Value>
			</Grid>
			<Grid gridColumns={COLUMNS}>
				<Value className="has-text-left">All Time</Value>
				<Value secFont>{data?.all_time}</Value>
				<Value secFont>{round(data?.all_time_avg_price_target)}</Value>
			</Grid>
		</div>
	);
};
export default PriceTargetEstimates;
