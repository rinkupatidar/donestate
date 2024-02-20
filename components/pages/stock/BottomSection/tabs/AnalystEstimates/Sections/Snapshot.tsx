import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { addOpacityAnimation } from "../../../../../../../animation";
import useFetch from "../../../../../../../hooks/useFetch";
import convertNumberToReadable from "../../../../../../../utilities/convertNumberToReadable";
import Icon from "../../../../../../Icon/Icon";
import LoaderOverlay from "../../../../../../Loader/LoaderOverlay";
import Grid from "../../../../../../Overview/Grid";
import Value from "../../../../../../Overview/Value";
import { EstimatesListInterface, SummaryInterface } from "../AnalystEstimatesTypes";
import styles from "./index.module.scss";

interface SnapshotProps {
	symbol: string;
}
const SUMMARY_COLUMNS = "1fr .5fr";
const ESTIMATE_LIST_COLUMNS = "1fr .5fr .5fr .5fr";
const Snapshot = ({ symbol }: SnapshotProps) => {
	const [page, setPage] = useState(1);
	const [idx, setIdx] = useState(0); // index for navigating analystEstimatesList
	const [analystEstimatesList, isAnalystEstimatesListLoading] = useFetch<EstimatesListInterface[] | undefined>(
		"getAnalystEstimatesList",
		{ symbol, page_no: page },
		{ shouldShowLoadingOnRefetch: true }
	);

	const [analystSummary, isAnalystSummaryLoading] = useFetch<SummaryInterface | undefined>("getAnalystRatingSummary", { symbol });

	const handleNav = (n: number) => {
		if (n > 0 && idx + n > analystEstimatesList?.length! - 1) {
			setPage(page + 1);
			setIdx(0);
		} else if (n < 0 && idx + n < 0) {
			setPage(page - 1);
			setIdx(analystEstimatesList?.length! - 1);
		} else setIdx(idx + n);
	};

	const analystEstimates = analystEstimatesList?.[idx];
	return (
		<div className={styles.snapshot}>
			<AnimatePresence>{(isAnalystSummaryLoading || isAnalystEstimatesListLoading) && <LoaderOverlay />}</AnimatePresence>
			<p className="section-title">Snap shot</p>
			<Grid gridColumns={SUMMARY_COLUMNS}>
				<Value className="has-text-left">Buy</Value>
				<Value>{analystSummary?.buy}</Value>
			</Grid>

			<Grid gridColumns={SUMMARY_COLUMNS}>
				<Value className="has-text-left">Consensus</Value>
				<Value>{analystSummary?.consensus}</Value>
			</Grid>

			<Grid gridColumns={SUMMARY_COLUMNS}>
				<Value className="has-text-left">Hold</Value>
				<Value>{analystSummary?.hold}</Value>
			</Grid>

			<Grid gridColumns={SUMMARY_COLUMNS}>
				<Value className="has-text-left">Sell</Value>
				<Value>{analystSummary?.sell}</Value>
			</Grid>

			<Grid gridColumns={SUMMARY_COLUMNS}>
				<Value className="has-text-left">Strong Buy</Value>
				<Value>{analystSummary?.strong_buy}</Value>
			</Grid>

			<Grid gridColumns={SUMMARY_COLUMNS}>
				<Value className="has-text-left">Strong Sell</Value>
				<Value>{analystSummary?.strong_sell}</Value>
			</Grid>
			<br />

			<AnimatePresence exitBeforeEnter>
				<motion.div {...addOpacityAnimation} key={idx}>
					<Grid isInfo gridColumns={ESTIMATE_LIST_COLUMNS}>
						<Value className="has-text-left">{analystEstimates?.date} </Value>
						<Value>High </Value>
						<Value>Low </Value>
						<Value>Avg </Value>
					</Grid>
					<Grid gridColumns={ESTIMATE_LIST_COLUMNS}>
						<Value className="has-text-left"> Estimated Revenue </Value>
						<Value secFont>{convertNumberToReadable(analystEstimates?.estimatedRevenueHigh)}</Value>
						<Value secFont>{convertNumberToReadable(analystEstimates?.estimatedRevenueLow)}</Value>
						<Value secFont>{convertNumberToReadable(analystEstimates?.estimatedRevenueAvg)}</Value>
					</Grid>
					<Grid gridColumns={ESTIMATE_LIST_COLUMNS}>
						<Value className="has-text-left"> Estimated EBITDA</Value>
						<Value secFont>{convertNumberToReadable(analystEstimates?.estimatedEbitdaHigh)}</Value>
						<Value secFont>{convertNumberToReadable(analystEstimates?.estimatedEbitdaLow)}</Value>
						<Value secFont>{convertNumberToReadable(analystEstimates?.estimatedEbitdaAvg)}</Value>
					</Grid>
					<Grid gridColumns={ESTIMATE_LIST_COLUMNS}>
						<Value className="has-text-left"> Estimated SG&A</Value>
						<Value secFont>{convertNumberToReadable(analystEstimates?.estimatedSgaExpenseHigh)}</Value>
						<Value secFont>{convertNumberToReadable(analystEstimates?.estimatedSgaExpenseLow)}</Value>
						<Value secFont>{convertNumberToReadable(analystEstimates?.estimatedSgaExpenseAvg)}</Value>
					</Grid>
					<Grid gridColumns={ESTIMATE_LIST_COLUMNS}>
						<Value className="has-text-left"> Estimated NI</Value>
						<Value secFont>{convertNumberToReadable(analystEstimates?.estimatedNetIncomeHigh)}</Value>
						<Value secFont>{convertNumberToReadable(analystEstimates?.estimatedNetIncomeLow)}</Value>
						<Value secFont>{convertNumberToReadable(analystEstimates?.estimatedNetIncomeAvg)}</Value>
					</Grid>
					<Grid gridColumns={ESTIMATE_LIST_COLUMNS}>
						<Value className="has-text-left"> Estimated EPS</Value>
						<Value secFont>{convertNumberToReadable(analystEstimates?.estimatedEpsHigh)}</Value>
						<Value secFont>{convertNumberToReadable(analystEstimates?.estimatedEpsLow)}</Value>
						<Value secFont>{convertNumberToReadable(analystEstimates?.estimatedEpsAvg)}</Value>
					</Grid>
				</motion.div>
			</AnimatePresence>
			<br />
			<div className="tags is-right">
				<div data-disabled={page === 1 && idx === 0} onClick={() => handleNav(-1)} className="tag is-warning">
					<Icon className="is-small">
						<FaChevronLeft />
					</Icon>
				</div>
				<div onClick={() => handleNav(1)} className="tag is-warning">
					<Icon className="is-small">
						<FaChevronRight />
					</Icon>
				</div>
			</div>
		</div>
	);
};
export default Snapshot;
