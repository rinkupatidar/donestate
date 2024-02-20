import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useState } from "react";
import useFetch from "../../../../../../../hooks/useFetch";
import { round } from "../../../../../../../utilities/round";
import LoadingSection from "../../../../../../Loader/LoadingSection";
import { UpgradesAndDowngradesInterface } from "../AnalystEstimatesTypes";
import styles from "./index.module.scss";

interface UpgradesAndDowngradesProps {
	symbol: string;
}

const UpgradesAndDowngrades = ({ symbol }: UpgradesAndDowngradesProps) => {
	const [page, setPage] = useState(1);
	const [data, isLoading] = useFetch<UpgradesAndDowngradesInterface[]>(
		"getUpgradesDowngradesList",
		{
			symbol,
			page_no: page,
		},
		{
			shouldFetch: !!symbol,
			initialData: [],
			handleResponse: (newData) => {
				const val: UpgradesAndDowngradesInterface[] = [...data, ...newData];
				return val;
			},
		}
	);
	return (
		<div className={styles.analyst_price_targets}>
			<p className="section-title"> Upgrades and Downgrades</p>
			<div className={styles.analyst_item_wrapper}>
				{isLoading ? (
					<LoadingSection />
				) : data?.length ? (
					<>
						{data.map((item, idx) => (
							<AnalystItem key={idx} {...item} />
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
export default UpgradesAndDowngrades;

const AnalystItem = ({ price_when_posted, published_date, analyst_company, news_title, news_url, new_rating, previous_rating, news_base_url }: UpgradesAndDowngradesInterface) => {
	return (
		<motion.div role="button" onClick={() => window.open(news_url, news_title, "width=600,height=600")} initial="initial" whileHover="hover" className={styles.analyst_item}>
			<div className={styles.analyst_header}>
				<motion.p variants={{ hover: { height: "auto" } }} className={styles.analyst_title}>
					{news_title}
				</motion.p>
				<p className="is-size-7 has-text-grey mt-2">
					{dayjs(published_date).fromNow()} by {analyst_company} on {news_base_url}
				</p>
			</div>

			<motion.div variants={{ hover: { height: "auto" } }} className={styles.analyst_description}>
				<div className="pb-3 px-3 is-size-7">
					<p>
						<span className="has-text-grey">Price when posted </span> : <b className="has-text-warning has-tw-bold is-family-secondary">{round(price_when_posted)}</b> |{" "}
						<span className="has-text-grey">Previous Rating</span> : <b className="has-text-warning has-tw-bold is-family-secondary">{previous_rating}</b> |{" "}
						<span className="has-text-grey">New Rating</span> : <b className="has-text-warning has-tw-bold is-family-secondary">{new_rating}</b>
					</p>
				</div>
			</motion.div>
		</motion.div>
	);
};
