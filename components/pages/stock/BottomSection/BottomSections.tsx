import { AnimatePresence, motion } from "framer-motion"
import React from "react"
import { OPACITY_VARIANT } from "../../../../utils/variants"
import LoaderOverlay from "../../../Loader/LoaderOverlay"
import { NavItemType } from "../types"
import BottomInfoNav from "./BottomInfoNav"
import { CompanyProfileResponseInterface } from "./BottomSectionTypes"
import styles from "./index.module.scss"
import AnalystEstimates from "./tabs/AnalystEstimates/AnalystEstimates"
import ChartsWrapper from "./tabs/Chart/ChartsWrapper"
import Financials from "./tabs/Financials/Financials"
import Overview from "./tabs/Overview/Overview"
import Ownership from "./tabs/Ownership/Ownership"
import PeersList from "./tabs/PeersList/PeersList"
import Price from "./tabs/Price/Price"
import Profile from "./tabs/Profile/Profile"
import SocialSentiment from "./tabs/SocialSentiment/SocialSentiment"

interface BottomSectionsProps {
	companyProfileData?: CompanyProfileResponseInterface
	isCompanyProfileLoading: boolean
	activeTab: NavItemType
	setActiveTab: React.Dispatch<React.SetStateAction<NavItemType>>
	symbol: string
}

const BottomSections = ({ companyProfileData, isCompanyProfileLoading, activeTab, setActiveTab, symbol }: BottomSectionsProps) => {
	return (
		<div className={styles.bottom_info}>
			<BottomInfoNav activeTab={activeTab} setActiveTab={setActiveTab} />
			<AnimatePresence>{isCompanyProfileLoading && <LoaderOverlay />}</AnimatePresence>
			<AnimatePresence>
				<motion.div key={activeTab} variants={OPACITY_VARIANT} initial="initial" animate="animate" exit="exit">
					<div className={styles.tabs_container}>
						{activeTab === "Overview" && <Overview companyProfileData={companyProfileData} />}
						{activeTab === "Profile" && <Profile companyProfileData={companyProfileData} />}
						{activeTab === "Charts" && <ChartsWrapper symbol={symbol} />}
						{activeTab === "Financials" && <Financials symbol={symbol} />}
						{activeTab === "Price" && <Price symbol={symbol} />}
						{activeTab === "Estimates" && <AnalystEstimates symbol={symbol} />}
						{activeTab === "Peers" && <PeersList symbol={symbol} />}
						{activeTab === "Social Sentiment" && <SocialSentiment symbol={symbol} />}
						{activeTab === "Ownership" && <Ownership symbol={symbol} />}
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	)
}
export default BottomSections
