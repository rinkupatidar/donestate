import { useState } from "react"
import useFetch from "../../../../../../../../../hooks/useFetch"
import convertNumberToReadable from "../../../../../../../../../utilities/convertNumberToReadable"
import { round } from "../../../../../../../../../utilities/round"
import { GetLastReportedOwnershipDataResponseInterface } from "../../../OwnershipInterface"

const cols = "200px repeat(8, 100px)"
interface Props {
	symbol: string
}
export default function InstitutionalOwnerShipSection({ symbol }: Props) {
	const [page, setPage] = useState(1)
	const [data, isLoading, setData] = useFetch<Partial<GetLastReportedOwnershipDataResponseInterface>>("getLastReportedOwnershipSummary", { symbol }, { initialData: {} })
	return (
		<div className="v_data_section mb-3">
			<p className="section-title">Institutional Ownerships</p>
			<div>
				<div className="table_wrapper">
					<div className="table_item">
						<div className="table_head">Reporting date</div>
						<div className="table_content">{data.reporting_date}</div>
					</div>
					<div className="table_item">
						<div className="table_head">Ownership %</div>
						<div className="table_content">{data.total_ownership} </div>
					</div>
					<div className="table_item">
						<div className="table_head"># of institutions</div>
						<div className="table_content">{data.total_no_of_institutions}</div>
					</div>
					<div className="table_item">
						<div className="table_head"># Shares</div>
						<div className="table_content">{convertNumberToReadable(data.total_shares)} </div>
					</div>
					<div className="table_item">
						<div className="table_head">Change in Ownership since previous quarter</div>
						<div className="table_content">{round(data.total_change_in_ownership)}</div>
					</div>
				</div>
			</div>
		</div>
	)
}
