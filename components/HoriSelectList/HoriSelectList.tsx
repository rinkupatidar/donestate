import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import styles from "./index.module.scss"

interface HoriSelectListProps {
	dataArr: DropdownItemType[]
	initialIdx?: number
	onClick?: (item: any) => void
	layoutId?: string
	value?: any
	controlKey?: string // when you want the HoriSelect to be a controlled component, give this to make a comparison again anything else
	itemClassName?: string
	key?: string
}

const HoriSelectList = ({ dataArr, initialIdx, onClick, layoutId = "layout_bg", value, controlKey, itemClassName, key: _key }: HoriSelectListProps) => {
	const [selectedIdx, setSelectedIdx] = useState<undefined | number>()
	useEffect(() => {
		if (value === undefined) return
		const idx = dataArr.findIndex((val) => value === (controlKey ? (val as { [key: string]: any })[controlKey] : getDisplayValue(val)))
		setSelectedIdx(idx)
	}, [value])

	const getDisplayValue = (item: DropdownItemType) => {
		let displayValue
		if (typeof item === "string") displayValue = item
		else if (typeof item === "object") {
			if (item.displayValue) displayValue = item.displayValue
			else throw new Error("Data passed does not have a display Value")
		}
		return displayValue
	}

	const handleChange = (idx: number) => {
		setSelectedIdx(idx)
		if (onClick) {
			onClick(dataArr[idx])
		}
	}

	let idxToRead: number
	if (selectedIdx !== undefined) idxToRead = selectedIdx
	else {
		if (initialIdx !== undefined) idxToRead = initialIdx
		else idxToRead = 0
	}
	return (
		<div className={styles.container}>
			<AnimatePresence>
				{dataArr.map((item, idx) => (
					
					<motion.div exit={{ opacity: 0 }} onClick={() => handleChange(idx)} key={(_key ?? "") + idx} className={`${styles.item} ${itemClassName} ${idxToRead === idx ? styles.is_active : ""}`}>
						<p>{getDisplayValue(item)}</p>
						{idxToRead === idx && <motion.div layoutId={layoutId} className={styles.floating_bg}></motion.div>}
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	)
}
export default HoriSelectList
