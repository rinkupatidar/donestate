import dayjs from "dayjs"
import * as relativeTime from "dayjs/plugin/relativeTime"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import { useState } from "react"
import useFetch from "../../../../../../hooks/useFetch"
import convertNumberToReadable from "../../../../../../utilities/convertNumberToReadable"
import { isNumber } from "../../../../../../utilities/isNumber"
import LoadingSection from "../../../../../Loader/LoadingSection"
import Grid from "../../../../../Overview/Grid"
import SubSectionWrapper from "../../../../../Overview/SubSectionWrapper"
import Value from "../../../../../Overview/Value"
import { CompanyProfileResponseInterface } from "../../BottomSectionTypes"
import { CompanyStockNewsResponseType, SocialSentimentsResponseTypes } from "./OverviewTypes"
import styles from "./index.module.scss"

interface OverviewProps {
	companyProfileData?: CompanyProfileResponseInterface
}

const SOCIAL_SENTIMENTS_COLUMNS = "1fr .6fr .6fr"

dayjs.extend(relativeTime as any)
const Overview = ({ companyProfileData }: OverviewProps) => {

	const router = useRouter()
	const symbol = router.query.symbol
	const shouldFetch = router.isReady

	const [isDescriptionReadMoreTrue, setIsDescriptionReadMoreTrue] = useState(false)

	const [companyStockNewsPageNum, setCompanyStockNewsPageNum] = useState(1)
	const [companyStockNewsResponse, companyStockNewsResponseIsLoading] = useFetch<CompanyStockNewsResponseType[]>(
		"getCompanyStockNews",
		{ symbol, page_no: companyStockNewsPageNum },
		{
			shouldFetch,
			initialData: [],
			handleResponse: (newData) => {
				const val: CompanyStockNewsResponseType[] = [...companyStockNewsResponse, ...newData]
				return val
			},
		}
	)

	const [socialSentimentsResponse, isSocialSentimentsResponseLoading] = useFetch<SocialSentimentsResponseTypes>("getLatestSocialSentimentInfo", { symbol: symbol }, { shouldFetch: router.isReady })

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<div className={styles.table}>
					<p className="section-title">KEY METRICS</p>
					<div className={styles.key_metrics_wrapper}>
						{companyProfileData?.basic_key_metrics &&
							Object.keys(companyProfileData?.basic_key_metrics).map((item, idx) => {
								let val: number | string | undefined = companyProfileData.basic_key_metrics[item as keyof CompanyProfileResponseInterface["basic_key_metrics"]]
								if (!!!val) val = "-"
								else if (isNumber(val)) val = convertNumberToReadable(val)
								return (
									<div key={idx} className={styles.key_metrics_item}>
										<div className={styles.head}>{item.split("_").join(" ")}</div>
										<div className={styles.content}>{val}</div>
									</div>
								)
							})}
					</div>
				</div>

				{isSocialSentimentsResponseLoading ? (
					<LoadingSection />
				) : (
					<SubSectionWrapper>
						<p className="is-size-5 has-tw-medium is-capitalized mb-3">Social Sentiments </p>
						<Grid isInfo gridColumns={SOCIAL_SENTIMENTS_COLUMNS}>
							<Value className="is-capitalized has-text-left is-clickable"> </Value>
							<Value className="is-capitalized is-clickable">Stocktwits</Value>
							<Value className="is-capitalized is-clickable">Twitter</Value>
						</Grid>
						<Grid gridColumns={SOCIAL_SENTIMENTS_COLUMNS}>
							<Value className="is-capitalized has-text-left is-clickable">Social Sentiment</Value>
							<Value className="is-capitalized is-clickable is-family-secondary">
								{socialSentimentsResponse.stocktwits_likes ? convertNumberToReadable(socialSentimentsResponse.stocktwits_likes) : "-"}
							</Value>
							<Value className="is-capitalized is-clickable is-family-secondary">
								{socialSentimentsResponse.twitter_comments ? convertNumberToReadable(socialSentimentsResponse.twitter_comments) : "-"}
							</Value>
						</Grid>
						<Grid gridColumns={SOCIAL_SENTIMENTS_COLUMNS}>
							<Value className="is-capitalized has-text-left is-clickable">Posts</Value>
							<Value className="is-capitalized is-clickable is-family-secondary">
								{socialSentimentsResponse.stocktwits_comments ? convertNumberToReadable(socialSentimentsResponse.stocktwits_comments) : "-"}
							</Value>
							<Value className="is-capitalized is-clickable is-family-secondary">
								{socialSentimentsResponse.stocktwits_posts ? convertNumberToReadable(socialSentimentsResponse.stocktwits_posts) : "-"}
							</Value>
						</Grid>
						<Grid gridColumns={SOCIAL_SENTIMENTS_COLUMNS}>
							<Value className="is-capitalized has-text-left is-clickable">Comments</Value>
							<Value className="is-capitalized is-clickable is-family-secondary">
								{socialSentimentsResponse.twitter_posts ? convertNumberToReadable(socialSentimentsResponse.twitter_posts) : "-"}
							</Value>
							<Value className="is-capitalized is-clickable is-family-secondary">
								{socialSentimentsResponse.twitter_sentiments ? convertNumberToReadable(socialSentimentsResponse.twitter_sentiments) : "-"}
							</Value>
						</Grid>
						<Grid gridColumns={SOCIAL_SENTIMENTS_COLUMNS}>
							<Value className="is-capitalized has-text-left is-clickable">Likes</Value>
							<Value className="is-capitalized is-clickable is-family-secondary">
								{socialSentimentsResponse.stocktwits_sentiments ? convertNumberToReadable(socialSentimentsResponse.stocktwits_sentiments) : "-"}
							</Value>
							<Value className="is-capitalized is-clickable is-family-secondary">
								{socialSentimentsResponse.twitter_likes ? convertNumberToReadable(socialSentimentsResponse.twitter_likes) : "-"}
							</Value>
						</Grid>
					</SubSectionWrapper>
				)}
			</div>

			<div className={styles.right}>
				<div className={styles.description}>
					<p className="section-title">DESCRIPTION</p>
					<div>
						<motion.p initial={{ height: "200px" }} animate={{ height: isDescriptionReadMoreTrue ? "auto" : "200px" }} className="is-clipped">
							{companyProfileData?.company_description} <br />
						</motion.p>
						<p className="has-text-grey is-clickable" onClick={() => setIsDescriptionReadMoreTrue(!isDescriptionReadMoreTrue)}>
							read {isDescriptionReadMoreTrue ? "less" : "more"}
						</p>
					</div>
					<div>
						<p>
							CIK: {companyProfileData?.cik_number}| ISIN: {companyProfileData?.is_in}| CUSIP: {companyProfileData?.cus_ip}
						</p>
						<p>Address : {companyProfileData?.address}</p>
						<p>
							Phone : {companyProfileData?.phone ?? "-"} | Website :{" "}
							<a href={companyProfileData?.website} target="_blank" className="has-text-warning" rel="noreferrer">
								{companyProfileData?.website}
							</a>{" "}
						</p>
					</div>
				</div>

				<div className={styles.recent_news}>
					<p className="section-title">Recent News</p>
					<div className={styles.news_item_wrapper}>
						{companyStockNewsResponseIsLoading ? (
							<LoadingSection />
						) : (
							<>
								{companyStockNewsResponse.map((item, idx) => (
									<NewsItem key={item.order} {...item} socialMediaCoverage />
								))}
								<motion.div
									onViewportEnter={() => {
										setCompanyStockNewsPageNum(companyStockNewsPageNum + 1)
									}}>
									<LoadingSection disableSection className="mt-3" />
								</motion.div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
export default Overview

interface props {
	socialMediaCoverage?: boolean
}
export const NewsItem = ({ description, image, source, title, url, published_date }: props & CompanyStockNewsResponseType) => {
	return (
		<motion.a onClick={() => window.open(url, title, "width=600,height=600")} target="popup" initial="initial" whileHover="hover" className={styles.news_item}>
			<div className={styles.news_header}>
				<div className={styles.img_wrapper}>
					<motion.img variants={{ hover: { scale: 1.2 } }} src={image} alt={title} />
				</div>
				<div className={styles.news_right}>
					<motion.p variants={{ hover: { height: "auto" } }} className={styles.news_title}>
						{title}
					</motion.p>
					<p className="is-size-7 has-text-grey mt-2">
						{dayjs(published_date).fromNow()} on {source}
					</p>
				</div>
			</div>

			<motion.div variants={{ hover: { height: "auto" } }} className={styles.news_description}>
				<div className="p-3">
					<p className="has-text-grey">{description}</p>
					<span className="has-text-grey is-size-7 is-underlined">read more</span>
				</div>
			</motion.div>
		</motion.a>
	)
}
