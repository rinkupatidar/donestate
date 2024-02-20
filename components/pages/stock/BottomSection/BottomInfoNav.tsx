import { motion } from "framer-motion"
import { useRouter } from "next/router"
import React from "react"
import { NavItemsArrayType, NavItemType } from "../types"
import styles from "./index.module.scss"

interface BottomInfoNavProps {
	activeTab: NavItemType
	setActiveTab: React.Dispatch<React.SetStateAction<NavItemType>>
}

const navItems: NavItemsArrayType = ["Overview", "Profile", "Charts", "Financials", "Price", "Estimates", "Options", "Peers", "Social Sentiment", "Ownership"]

const BottomInfoNav = ({ activeTab, setActiveTab }: BottomInfoNavProps) => {
	const router = useRouter()
	// const handleClick = (item: NavItemType) => {
	// 	console.log(item,'item')
	// 	const url = new URL(location.href)
	// 	url.searchParams.set("tab", item)
	// 	router.push(url, undefined, { scroll: false })
	// }
	const handleClick = (item: NavItemType) => {


		const url = new URL(location.href);
		url.searchParams.set("tab", item);

		// Remove "titles" parameter if it exists
		if (url.searchParams.has("titles") || url.searchParams.has("openChartId") || url.searchParams.has("ChartTitle") || url.searchParams.has("country_code") ) {
			url.searchParams.delete("titles");
			url.searchParams.delete("openChartId");
			url.searchParams.delete("ChartTitle");
			url.searchParams.delete("country_code");
		}


		router.push(url, undefined, { scroll: false });
	};

	return (
		<nav className={styles.bottom_info_nav}>
			{navItems.map((item) => (
				<div role="button" className={styles.nav_item} key={item} onClick={() => handleClick(item)}>
					{activeTab === item && <motion.div className={styles.floating_bg} />}
					{item}
				</div>
			))}
		</nav>
	)
}
export default BottomInfoNav
