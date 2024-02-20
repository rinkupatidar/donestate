import dayjs from "dayjs"
import addComma from "../../../../../../utilities/addComma"
import convertNumberToReadable from "../../../../../../utilities/convertNumberToReadable"
import { round } from "../../../../../../utilities/round"
import Grid from "../../../../../Overview/Grid"
import SubSectionWrapper from "../../../../../Overview/SubSectionWrapper"
import Value from "../../../../../Overview/Value"
import { CompanyProfileResponseInterface } from "../../BottomSectionTypes"
import styles from "./index.module.scss"
import { getCapitalizationWithDisplayNames, getEfficiencyDataWithDisplayNames, getLiquidityAndProfitabilityWithDisplayNames, getValuationDataWithDisplayNames } from "./ProfileUtils"
interface ProfileProps {
	companyProfileData?: CompanyProfileResponseInterface
}
const BOARD_MEMBERS_COLUMNS = "2fr 1fr .5fr .5fr .5fr .5fr"

const Profile = ({ companyProfileData }: ProfileProps) => {
	const companyLiquidityAndProfitabilityData = getLiquidityAndProfitabilityWithDisplayNames(companyProfileData)
	const companyEfficiencyData = getEfficiencyDataWithDisplayNames(companyProfileData)
	const companyCapitalizationData = getCapitalizationWithDisplayNames(companyProfileData)
	const valuationData = getValuationDataWithDisplayNames(companyProfileData)
	const boardMembersData = companyProfileData?.board_members

	return (
		<div className={styles.container}>
			<section className={styles.info_container}>
				<div className={styles.info_item}>
					<div className={styles.info_header}>Industry</div>
					<div className={styles.info_value}>{companyProfileData?.industry}</div>
				</div>
				<div className={styles.info_item}>
					<div className={styles.info_header}>Sector</div>
					<div className={styles.info_value}>{companyProfileData?.sector}</div>
				</div>
				<div className={styles.info_item}>
					<div className={styles.info_header}>Employees</div>
					<div className={styles.info_value}>{addComma(companyProfileData?.no_of_employees)}</div>
				</div>
			</section>
			<div className={styles.data_container}>
				<section className="v_data_section">
					<p className="section-title is-capitalized">Liquidity & Profitability </p>
					{companyLiquidityAndProfitabilityData.map(({ displayName, title, value }) => (
						<div key={title} title={title} className="v_data_section_value">
							<div className="has-text-white is-capitalized">{displayName}</div>
							<div className="is-family-secondary">{round(value)}</div>
						</div>
					))}
				</section>
				<section className="v_data_section">
					<p className="section-title is-capitalized">Efficiency</p>
					{companyEfficiencyData.map(({ displayName, title, value }) => (
						<div key={title} title={title} className="v_data_section_value">
							<div className="has-text-white is-capitalized">{displayName}</div>
							<div className="is-family-secondary">{convertNumberToReadable(round(value))}</div>
						</div>
					))}
				</section>
				<section className="v_data_section">
					<p className="section-title is-capitalized">Capitalization</p>
					{companyCapitalizationData.map(({ displayName, title, value }) => (
						<div key={title} title={title} className="v_data_section_value">
							<div className="has-text-white is-capitalized">{displayName}</div>
							<div className="is-family-secondary">{round(value)}</div>
						</div>
					))}
				</section>
				<section className="v_data_section">
					<p className="section-title is-capitalized">Valuation</p>
					{valuationData.map(({ displayName, title, value }) => (
						<div key={title} title={title} className="v_data_section_value">
							<div className="has-text-white is-capitalized">{displayName}</div>
							<div className="is-family-secondary">{convertNumberToReadable(round(value))}</div>
						</div>
					))}
				</section>
			</div>
			<SubSectionWrapper>
				<p className="is-size-5 has-tw-medium is-capitalized mb-3">Executive Management</p>
				<Grid isInfo gridColumns={BOARD_MEMBERS_COLUMNS}>
					<Value className="is-capitalized has-text-left">Title</Value>
					<Value className="is-capitalized has-text-left">Name</Value>
					<Value className="is-capitalized">Pay</Value>
					<Value className="is-capitalized">Gender</Value>
					<Value className="is-capitalized">Yearborn</Value>
					<Value className="is-capitalized">Titlesince</Value>
				</Grid>
				{boardMembersData?.map((item, idx) => (
					<Grid isDark={idx % 2 !== 0} key={idx} gridColumns={BOARD_MEMBERS_COLUMNS}>
						<Value className="is-capitalized has-text-left">{item.designation}</Value>
						<Value className="is-capitalized has-text-left">{item.name}</Value>
						<Value className="is-capitalized is-family-secondary" textColor={item.salary ? "green" : undefined}>
							{item.salary ? `${item.currency} ${convertNumberToReadable(item.salary)}` : "-"}
						</Value>
						<Value className="is-capitalized">{item.gender ? item.gender : "-"}</Value>
						<Value className="is-capitalized" textColor="yellow">
							{item.year_born ? `${item.year_born}` : "-"}
						</Value>
						<Value className="is-capitalized">{item.title_since ? dayjs(item.title_since).format("D/M/YYYY") : "-"}</Value>
					</Grid>
				))}
			</SubSectionWrapper>
		</div>
	)
}
export default Profile
