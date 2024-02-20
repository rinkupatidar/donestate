import { AnimatePresence,motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { AXIOS_INSTANCE, ROUTES } from "../../../../../../constants"
import useFetch from "../../../../../../hooks/useFetch"
import convertNumberToReadable from "../../../../../../utilities/convertNumberToReadable"
import { round } from "../../../../../../utilities/round"
import LoaderOverlay from "../../../../../Loader/LoaderOverlay"
import Grid from "../../../../../Overview/Grid"
import Value from "../../../../../Overview/Value"
import { PeersListInterface } from "./PeersListInterface"
import styles from "./index.module.scss"

interface PeersListProps {
	symbol: string
}

const gridColumnsVal = "50px 70px 200px repeat(5, 110px) 200px repeat(8, 150px) 150px repeat(3, 150px)  "
const PeersList = ({ symbol }: PeersListProps) => {
	const [peerList] = useFetch("getPeerList", { symbol }, { initialData: [] })
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState<PeersListInterface[]>([])
	const [sorting, setSorting] = useState<{
		key: keyof PeersListInterface | null
		ascending: boolean
	}>({
		key: "avg_volume",
		ascending: false,
	})
	useEffect(() => {
		if (peerList.length) {
			setIsLoading(true)
			// do something
			AXIOS_INSTANCE.post(`getPeerStockQuotes/${symbol}`, peerList).then((res) => {
				setData(res.data)
				setIsLoading(false)
			})
		}
	}, [peerList.length])

	const handleSortingClick = (key: keyof PeersListInterface) => {
		return () => {
			if (sorting.key === key) {
				if (sorting.ascending) {
					setSorting({ key: null, ascending: true })
					return
				}
				setSorting({ key, ascending: !sorting.ascending })
			} else {
				setSorting({ key, ascending: false })
			}
		}
	}

	const sortedData = useMemo(() => {
		if (!sorting.key) return data
		return [...data].sort((a, b) => {
			if (sorting.ascending) return (a[sorting.key!] as number) - (b[sorting.key!] as number)
			else return (b[sorting.key!] as number) - (a[sorting.key!] as number)
		})
	}, [sorting.key, sorting.ascending, data.length])

	return (
		<div className="fill-width">
			<AnimatePresence>{isLoading && <LoaderOverlay />}</AnimatePresence>
			<div className="v_data_section">
				<div className={styles.wrapper}>
					<Grid isInfo gridColumns={gridColumnsVal} className={styles.grid}>
						<Value title="Add to portfolio" className={`has-text-left ${styles.sticky} ${styles.is_info}`}>
							add
						</Value>
						<Value className={`has-text-left ${styles.sticky_2} ${styles.is_info}`}>symbol</Value>
						<Value className="has-text-left">equity name</Value>
						<Value onClick={handleSortingClick("change")}>
							<div className="v-center is-justify-content-flex-end is-clickable">
								{sorting.key === "change" && (
									<motion.div animate={{ rotate: sorting.ascending ? 180 : 0 }} className="icon">
										<AiOutlineCaretDown />
									</motion.div>
								)}
								<span>change</span>
							</div>
						</Value>
						<Value onClick={handleSortingClick("volume")}>
							<div className="v-center is-justify-content-flex-end is-clickable">
								{sorting.key === "volume" && (
									<motion.div animate={{ rotate: sorting.ascending ? 180 : 0 }} className="icon">
										<AiOutlineCaretDown />
									</motion.div>
								)}
								<span>volume</span>
							</div>
						</Value>
						<Value onClick={handleSortingClick("open")}>
							<div className="v-center is-justify-content-flex-end is-clickable">
								{sorting.key === "open" && (
									<motion.div animate={{ rotate: sorting.ascending ? 180 : 0 }} className="icon">
										<AiOutlineCaretDown />
									</motion.div>
								)}
								<span>open</span>
							</div>
						</Value>
						<Value onClick={handleSortingClick("eps")}>
							<div className="v-center is-justify-content-flex-end is-clickable">
								{sorting.key === "eps" && (
									<motion.div animate={{ rotate: sorting.ascending ? 180 : 0 }} className="icon">
										<AiOutlineCaretDown />
									</motion.div>
								)}
								<span>eps</span>
							</div>
						</Value>
						<Value onClick={handleSortingClick("pe")}>
							<div className="v-center is-justify-content-flex-end is-clickable">
								{sorting.key === "pe" && (
									<motion.div animate={{ rotate: sorting.ascending ? 180 : 0 }} className="icon">
										<AiOutlineCaretDown />
									</motion.div>
								)}
								<span>pe</span>
							</div>
						</Value>
						<Value onClick={handleSortingClick("current_price")}>
							<div className="v-center is-justify-content-flex-end is-clickable">
								{sorting.key === "current_price" && (
									<motion.div animate={{ rotate: sorting.ascending ? 180 : 0 }} className="icon">
										<AiOutlineCaretDown />
									</motion.div>
								)}
								<span>current price</span>
							</div>
						</Value>
						<Value onClick={handleSortingClick("change_percentage")}>
							<div className="v-center is-justify-content-flex-end is-clickable">
								{sorting.key === "change_percentage" && (
									<motion.div animate={{ rotate: sorting.ascending ? 180 : 0 }} className="icon">
										<AiOutlineCaretDown />
									</motion.div>
								)}
								<span>change (%)</span>
							</div>
						</Value>
						<Value onClick={handleSortingClick("day_high")}>
							<div className="v-center is-justify-content-flex-end is-clickable">
								{sorting.key === "day_high" && (
									<motion.div animate={{ rotate: sorting.ascending ? 180 : 0 }} className="icon">
										<AiOutlineCaretDown />
									</motion.div>
								)}
								<span>day high</span>
							</div>
						</Value>
						<Value onClick={handleSortingClick("day_low")}>
							<div className="v-center is-justify-content-flex-end is-clickable">
								{sorting.key === "day_low" && (
									<motion.div animate={{ rotate: sorting.ascending ? 180 : 0 }} className="icon">
										<AiOutlineCaretDown />
									</motion.div>
								)}
								<span>day low</span>
							</div>
						</Value>
						<Value onClick={handleSortingClick("year_high")}>
							<div className="v-center is-justify-content-flex-end is-clickable">
								{sorting.key === "year_high" && (
									<motion.div animate={{ rotate: sorting.ascending ? 180 : 0 }} className="icon">
										<AiOutlineCaretDown />
									</motion.div>
								)}
								<span>year high</span>
							</div>
						</Value>
						<Value onClick={handleSortingClick("year_low")}>
							<div className="v-center is-justify-content-flex-end is-clickable">
								{sorting.key === "year_low" && (
									<motion.div animate={{ rotate: sorting.ascending ? 180 : 0 }} className="icon">
										<AiOutlineCaretDown />
									</motion.div>
								)}
								<span>year low</span>
							</div>
						</Value>
						<Value onClick={handleSortingClick("market_cap")}>
							<div className="v-center is-justify-content-flex-end is-clickable">
								{sorting.key === "market_cap" && (
									<motion.div animate={{ rotate: sorting.ascending ? 180 : 0 }} className="icon">
										<AiOutlineCaretDown />
									</motion.div>
								)}
								<span>market cap</span>
							</div>
						</Value>
						<Value onClick={handleSortingClick("price_avg_50")}>
							<div className="v-center is-justify-content-flex-end is-clickable">
								{sorting.key === "price_avg_50" && (
									<motion.div animate={{ rotate: sorting.ascending ? 180 : 0 }} className="icon">
										<AiOutlineCaretDown />
									</motion.div>
								)}
								<span>price avg 50 </span>
							</div>
						</Value>
						<Value onClick={handleSortingClick("price_avg_200")}>
							<div className="v-center is-justify-content-flex-end is-clickable">
								{sorting.key === "price_avg_200" && (
									<motion.div animate={{ rotate: sorting.ascending ? 180 : 0 }} className="icon">
										<AiOutlineCaretDown />
									</motion.div>
								)}
								<span>price avg 200 </span>
							</div>
						</Value>
						<Value onClick={handleSortingClick("avg_volume")}>
							<div className="v-center is-justify-content-flex-end is-clickable">
								{sorting.key === "avg_volume" && (
									<motion.div animate={{ rotate: sorting.ascending ? 180 : 0 }} className="icon">
										<AiOutlineCaretDown />
									</motion.div>
								)}
								<span>avg vol.</span>
							</div>
						</Value>
						<Value>exch</Value>
						<Value onClick={handleSortingClick("previous_close")}>
							<div className="v-center is-justify-content-flex-end is-clickable">
								{sorting.key === "previous_close" && (
									<motion.div animate={{ rotate: sorting.ascending ? 180 : 0 }} className="icon">
										<AiOutlineCaretDown />
									</motion.div>
								)}
								<span>prev close</span>
							</div>
						</Value>
						<Value onClick={handleSortingClick("shares_outstanding")}>
							<div className="v-center is-justify-content-flex-end is-clickable">
								{sorting.key === "shares_outstanding" && (
									<motion.div animate={{ rotate: sorting.ascending ? 180 : 0 }} className="icon">
										<AiOutlineCaretDown />
									</motion.div>
								)}
								<span>o/s shares</span>
							</div>
						</Value>
					</Grid>

					{sortedData.map((item, idx) => (
						<Item idx={idx} item={item} key={item.equity_symbol} />
					))}
				</div>
			</div>
		</div>
	)
}
export default PeersList

interface ItemProps {
	item: PeersListInterface
	idx: number
}
const Item = ({ item, idx }: ItemProps) => {
	const [isChecked, setIsChecked] = useState(false)
	return (
		<Grid className={styles.grid} gridColumns={gridColumnsVal}>
			<Value className={`has-text-left ${styles.sticky}`}>
				<input style={{ opacity: isChecked ? 1 : undefined }} onClick={() => setIsChecked(!isChecked)} checked={isChecked} type="checkbox" className="mr-4"></input>
			</Value>
			<Value className={`has-text-left ${styles.sticky_2}`}>
				<Link href={`${ROUTES.STOCK}?symbol=${item.equity_symbol}`}>{item.equity_symbol}</Link>
			</Value>
			<Value title={item.equity_name} className={`${styles.overflow_text} has-text-left`}>
				{item.equity_name}
			</Value>
			<Value className="is-family-secondary">{item.change}</Value>
			<Value className="is-family-secondary">{item.volume}</Value>
			<Value className="is-family-secondary">{round(item.open)}</Value>
			<Value className="is-family-secondary">{item.eps}</Value>
			<Value className="is-family-secondary">{round(item.pe)}</Value>
			<Value className="is-family-secondary">{item.current_price}</Value>
			<Value className="is-family-secondary">{round(item.change_percentage)}</Value>
			<Value className="is-family-secondary">{round(item.day_high)}</Value>
			<Value className="is-family-secondary">{round(item.day_low)}</Value>
			<Value className="is-family-secondary">{round(item.year_high)}</Value>
			<Value className="is-family-secondary">{round(item.year_low)}</Value>
			<Value className="is-family-secondary">{convertNumberToReadable(item.market_cap)}</Value>
			<Value className="is-family-secondary">{round(item.price_avg_50)}</Value>
			<Value className="is-family-secondary">{round(item.price_avg_200)}</Value>
			<Value className="is-family-secondary">{item.avg_volume}</Value>
			<Value>{item.exchange}</Value>
			<Value className="is-family-secondary">{round(item.previous_close)}</Value>
			<Value className="is-family-secondary">{convertNumberToReadable(item.shares_outstanding)}</Value>
		</Grid>
	)
}
