import download from "downloadjs"
import { useState } from "react"
import "react-datepicker/dist/react-datepicker.css"
import { AXIOS_INSTANCE } from "../../../../../../constants"
import Button from "../../../../../Button/Button"
import Dropdown from "../../../../../Dropdown/Dropdown"
import Icon from "../../../../../Icon/Icon"
import Modal from "../../../../../Modal/Modal"
import styles from "./index.module.scss"

interface DownloadSentimentsModalProps {
	close: () => void
	symbol: string
}

const dropdownData = {
	"Last 7 Days": "LAST_7_DAYS",
	"Last 14 Days": "LAST_14_DAYS",
	"Last 21 Days": "LAST_21_DAYS",
	"Last 28 Days": "LAST_28_DAYS",
}
const DownloadSentimentsModal = ({ close, symbol }: DownloadSentimentsModalProps) => {
	const [isLoading, setIsLoading] = useState(false)
	const [selectedValue, setSelectedValue] = useState<keyof typeof dropdownData>("Last 7 Days")

	const handleDownload = async () => {
		setIsLoading(true)

		const res = await AXIOS_INSTANCE.get("downloadHistoricalSocialSentimentInfo", {
			params: {
				symbol,
				downloadType: dropdownData[selectedValue],
			},
		})
		await download(res.data, `Social Sentiment (${selectedValue}).csv`, "text/plain")
		close()
	}
	return (
		<Modal disableOverflowHidden width="fit-content" close={close}>
			<div className={styles.modal_wrapper}>
				<Dropdown onClick={setSelectedValue} dataArr={Object.keys(dropdownData)} />
			</div>
			<br />
			<Button loading={isLoading} onClick={handleDownload} size="small" className="is-warning is-fullwidth">
				<Icon src="download.svg" />
				<span>Download</span>
			</Button>
		</Modal>
	)
}
export default DownloadSentimentsModal
