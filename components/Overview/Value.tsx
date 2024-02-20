import { motion } from "framer-motion"
import { ReactNode, useEffect } from "react"
import { round } from "../../utilities/round"
import styles from "./index.module.scss"
interface valueProps {
	className?: string
	children: ReactNode
	textColor?: "red" | "green" | "yellow"
	title?: string
	shouldAnimate?: boolean
	id?: string
	secFont?: boolean
	onClick?: () => void
	spanStyle?: React.CSSProperties
	keepDecimal?: boolean
}

const Value = ({ children, className, textColor, title, shouldAnimate, id, secFont, onClick, spanStyle, keepDecimal }: valueProps) => {
	if (textColor === undefined && typeof children === "number") {
		if (children >= 0) textColor = "green"
		else textColor = "red"
	}
	if (typeof children === "number") children = round(children, { comma: true, keepDecimal })
	useEffect(() => {
		if (shouldAnimate && id) {
			const element = document.getElementById(id) as HTMLElement
			let _textColor
			if (textColor !== undefined && typeof children === "number") _textColor = children >= 0 ? "green" : "red"

			if (!_textColor || !element) return

			element.classList.remove(`animate_${textColor}`)
			void element.offsetWidth
			element.classList.add(`animate_${textColor}`)
		}
	}, [children, textColor])
	return (
		<motion.div onClick={onClick} title={title} className={`${styles.value} ${styles[`is_${textColor}`]} ${className ?? ""} ${secFont ? "is-family-secondary" : ""}`}>
			<span style={spanStyle} id={id}>
				{children}
			</span>
		</motion.div>
	)
}
export default Value
