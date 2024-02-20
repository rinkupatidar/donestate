import { AnimatePresence } from "framer-motion"
import { useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import useFetch from "../../../../../../hooks/useFetch"
import { round } from "../../../../../../utilities/round"
import Button from "../../../../../Button/Button"
import HoriSelectList from "../../../../../HoriSelectList/HoriSelectList"
import Icon from "../../../../../Icon/Icon"
import LoaderOverlay from "../../../../../Loader/LoaderOverlay"
import Grid from "../../../../../Overview/Grid"
import Value from "../../../../../Overview/Value"
import DownloadSentimentsModal from "./DownloadSentimentsModal"
import styles from "./index.module.scss"
import { SocialSentimentInterface } from "./SocialSentimentInterface"

interface SocialSentimentProps {
	symbol: string
}

const gridColumnsVal = ".5fr repeat(5, 1fr)"
const SocialSentiment = ({ symbol }: SocialSentimentProps) => {
	const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false)
	const [offset, setOffset] = useState(0) // multiples of 7
	const [selectedDate, setSelectedDate] = useState("")
	const [data, isLoading] = useFetch<SocialSentimentInterface[]>(
		"getHistoricalSocialSentimentInfo",
		{ symbol, offset, limit: 7 },
		{
			shouldFetch: !!symbol,
			shouldShowLoadingOnRefetch: true,
			initialData: [],
			handleResponse(val) {
				setSelectedDate(val[0].date)
				return val
			},
		}
	)
	const horiDataArr = data.map((val) => val.date)

	const selectedDateData = data.find((val) => val.date === selectedDate)
	return (
		<div className="is-relative fill-width">
			<AnimatePresence>
				{isLoading && <LoaderOverlay />}
				{isDownloadModalOpen && <DownloadSentimentsModal symbol={symbol} close={() => setIsDownloadModalOpen(false)} />}
			</AnimatePresence>

			<div className="is-flex is-justify-content-space-between">
				<div className="is-flex is-align-items-center my-3" style={{ gap: 8 }}>
					<Button disabled={offset <= 0} onClick={() => setOffset(offset - 7)} title="Previous Week" className="is-small is-warning">
						<Icon className="is-small">
							<FaChevronLeft />
						</Icon>
					</Button>
					<HoriSelectList value={selectedDate} onClick={(date) => setSelectedDate(date)} dataArr={horiDataArr} />
					<Button onClick={() => setOffset(offset + 7)} title="Next Week" className="is-small is-warning">
						<Icon className="is-small">
							<FaChevronRight />
						</Icon>
					</Button>
				</div>

				<Button onClick={() => setIsDownloadModalOpen(true)} size="small" className="is-warning">
					<Icon src="download.svg" />
					<span>Download</span>
				</Button>
			</div>

			<div className="columns fill-width mt-4">
				<div className="column is-6">
					<div>
						<p className="is-size-4 mb-2">Stock Twits</p>
						<div className="v_data_section">
							<Grid isInfo gridColumns={gridColumnsVal}>
								<Value className="has-text-left">time</Value>
								<Value>Posts</Value>
								<Value>Comments</Value>
								<Value>Likes</Value>
								<Value>Sentiments</Value>
								<Value>Impressions</Value>
							</Grid>
							{selectedDateData?.summary_info && (
								<Grid className={styles.summary_grid} gridColumns={gridColumnsVal}>
									<Value className="has-text-left">Summary</Value>
									<Value>{selectedDateData.summary_info.stocktwits_posts}</Value>
									<Value>{selectedDateData.summary_info.stocktwits_comments}</Value>
									<Value>{selectedDateData.summary_info.stocktwits_likes}</Value>
									<Value>{round(selectedDateData.summary_info.stocktwits_sentiments)}</Value>
									<Value>{selectedDateData.summary_info.stocktwits_impressions}</Value>
								</Grid>
							)}
							{selectedDateData?.hourly_info_list.map((val) => (
								<Grid gridColumns={gridColumnsVal} key={val.time}>
									<Value className="has-text-left">{val.time}</Value>
									<Value className="is-family-secondary">{val.stocktwits_posts}</Value>
									<Value className="is-family-secondary">{val.stocktwits_comments}</Value>
									<Value className="is-family-secondary">{val.stocktwits_likes}</Value>
									<Value className="is-family-secondary">{round(val.stocktwits_sentiments)}</Value>
									<Value className="is-family-secondary">{val.stocktwits_impressions}</Value>
								</Grid>
							))}
						</div>
					</div>
				</div>
				<div className="column is-6">
					<div>
						<p className="is-size-4 mb-2">Twitter</p>
						<div className="v_data_section">
							<Grid isInfo gridColumns={gridColumnsVal}>
								<Value className="has-text-left">time</Value>
								<Value>Posts</Value>
								<Value>Comments</Value>
								<Value>Likes</Value>
								<Value>Sentiments</Value>
								<Value>Impressions</Value>
							</Grid>
							{selectedDateData?.summary_info && (
								<Grid className={styles.summary_grid} gridColumns={gridColumnsVal}>
									<Value className="has-text-left">Summary</Value>
									<Value>{selectedDateData.summary_info.twitter_posts}</Value>
									<Value>{selectedDateData.summary_info.twitter_comments}</Value>
									<Value>{selectedDateData.summary_info.twitter_likes}</Value>
									<Value>{round(selectedDateData.summary_info.twitter_sentiments)}</Value>
									<Value>{selectedDateData.summary_info.twitter_impressions}</Value>
								</Grid>
							)}
							{selectedDateData?.hourly_info_list.map((val) => (
								<Grid gridColumns={gridColumnsVal} key={val.time}>
									<Value className="has-text-left">{val.time}</Value>
									<Value className="is-family-secondary">{val.twitter_posts}</Value>
									<Value className="is-family-secondary">{val.twitter_comments}</Value>
									<Value className="is-family-secondary">{val.twitter_likes}</Value>
									<Value className="is-family-secondary">{round(val.twitter_sentiments)}</Value>
									<Value className="is-family-secondary">{val.twitter_impressions}</Value>
								</Grid>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default SocialSentiment
