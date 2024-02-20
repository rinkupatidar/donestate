import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useState } from "react";
import useFetch from "../../../../../../../hooks/useFetch";
import { formatLinkWithHttps } from "../../../../../../../utilities/formatLinkWithHttps";
import { round } from "../../../../../../../utilities/round";
import LoadingSection from "../../../../../../Loader/LoadingSection";
import { PriceTargetListInterface } from "../AnalystEstimatesTypes";
import styles from "./index.module.scss";

interface AnalystPriceEstimatesProps {
	symbol: string;
}

const AnalystPriceEstimates = ({ symbol }: AnalystPriceEstimatesProps) => {
	const [page, setPage] = useState(1);
	const [data, isLoading] = useFetch<PriceTargetListInterface[]>(
		"getPriceTargetList",
		{
			symbol,
			page_no: page,
		},
		{
			shouldFetch: !!symbol,
			initialData: [],
			handleResponse: (newData) => {
				const val: PriceTargetListInterface[] = [...data, ...newData];
				return val;
			},
		}
	);
	return (
		<div className={styles.analyst_price_targets}>
			<p className="section-title">Price Estimates</p>
			<div className={styles.analyst_item_wrapper}>
				{isLoading ? (
					<LoadingSection />
				) : data?.length ? (
					<>
						{data.map((item, idx) => (
							<AnalystItem key={item.order} {...item} />
						))}
						<motion.div
							onViewportEnter={() => {
								setPage(page + 1);
							}}>
							<LoadingSection disableSection className="mt-3" />
						</motion.div>
					</>
				) : (
					<div className="section has-text-grey is-size-7 has-text-centered">No Target's Found </div>
				)}
			</div>
		</div>
	);
};
export default AnalystPriceEstimates;

const AnalystItem = ({ adj_price_target, price_target, price_when_posted, published_date, analyst_company, news_publisher, news_source, news_title, news_url }: PriceTargetListInterface) => {
	return (
		<motion.div role="button" onClick={() => window.open(news_url, news_title, "width=600,height=600")} initial="initial" whileHover="hover" className={styles.analyst_item}>
			<div className={styles.analyst_header}>
				<motion.p variants={{ hover: { height: "auto" } }} className={styles.analyst_title}>
					{news_title}
				</motion.p>
				<p className="is-size-7 has-text-grey mt-2">
					{dayjs(published_date).fromNow()} by {analyst_company} on{" "}
					<a onClick={(e) => e.stopPropagation()} target="_blank" href={formatLinkWithHttps(news_source)} rel="noreferrer" className="has-text-grey is-underlined">
						{news_source}{" "}
					</a>
				</p>
			</div>

			<motion.div variants={{ hover: { height: "auto" } }} className={styles.analyst_description}>
				<div className="pb-3 px-3 is-size-7">
					<span className="has-text-grey">Price when posted </span> : <b className="has-text-warning has-tw-bold is-family-secondary">{round(price_when_posted)}</b> |{" "}
					<span className="has-text-grey">Price Target</span> : <b className="has-text-warning has-tw-bold is-family-secondary">{round(price_target)}</b>
				</div>
			</motion.div>
		</motion.div>
	);
};
