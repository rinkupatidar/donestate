import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { addOpacityAnimation } from "../../../../../../animation"
import HoriSelectList from "../../../../../HoriSelectList/HoriSelectList"
import InsidersOwnership from "./tabs/InsidersOwnerShip/InsidersOwnerShip"
import InstitutionalOwnership from "./tabs/InstitutionalOwnership/InstitutionalOwnership"
import SenateTrading from "./tabs/SenateTrading/SenateTrading"

interface OwnershipProps {
	symbol: string
}
const tabs = ["Institutional Ownerships", "Insiders Ownership", "Senate Trading"]
const Ownership = ({ symbol }: OwnershipProps) => {
	const [tab, setTab] = useState<typeof tabs[number]>(tabs[0])
	return (
		<div className="fill-width">
			<HoriSelectList value={tab} onClick={setTab} dataArr={tabs} />
			<AnimatePresence>
				<motion.div className="mt-3" key={tab} {...addOpacityAnimation}>
					{tab === "Institutional Ownerships" && <InstitutionalOwnership symbol={symbol} />}
					{tab === "Insiders Ownership" && <InsidersOwnership symbol={symbol} />}
					{tab === "Senate Trading" && <SenateTrading symbol={symbol} />}
				</motion.div>
			</AnimatePresence>
		</div>
	)
}
export default Ownership
