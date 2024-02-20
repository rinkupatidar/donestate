import { FaCheckCircle } from "react-icons/fa";
import Icon from "../../Icon/Icon";

export const getFormattedData = (data: string) => {
	if (data === "yes")
		return (
			<Icon>
				<FaCheckCircle size={22} />
			</Icon>
		);
	else if (data === "no") return "-";
	else return data;
};
export const pricingData: any = {
	"Core Data & Functionality": [
		{
			text: "Global equities, fundamentals & valuation",
			free: "5 stocks/day",
			student: "yes",
			standard: "yes",
			corporate: "yes",
		},
		{
			text: "Segmental information",
			free: "no",
			student: "yes",
			standard: "yes",
			corporate: "yes",
		},
		{
			text: "Peer review",
			free: "no",
			student: "yes",
			standard: "yes",
			corporate: "yes",
		},
		{
			text: "Download historical prices/fundamentals",
			free: "no",
			student: "no",
			standard: "no",
			corporate: "yes",
		},
		{
			text: "Download financial statements",
			free: "no",
			student: "no",
			standard: "yes",
			corporate: "yes",
		},
		{
			text: "Download of fields and information created",
			free: "5 stocks/day",
			student: "yes",
			standard: "yes",
			corporate: "yes",
		},
		{
			text: "Download graphs",
			free: "5 stocks/day",
			student: "yes",
			standard: "yes",
			corporate: "yes",
		},
		{
			text: "Global bonds, yield curves & FX",
			free: "yes",
			student: "yes",
			standard: "yes",
			corporate: "yes",
		},
		{
			text: "Advanced charting",
			free: "yes",
			student: "yes",
			standard: "yes",
			corporate: "yes",
		},
		{
			text: "Market dashboards",
			free: "yes",
			student: "yes",
			standard: "yes",
			corporate: "yes",
		},
		{
			text: "Economic calendar",
			free: "yes",
			student: "yes",
			standard: "yes",
			corporate: "yes",
		},
		{
			text: "Security overview & description",
			free: "5 stocks/day",
			student: "yes",
			standard: "yes",
			corporate: "yes",
		},
		{
			text: "US mutual fund data",
			free: "no",
			student: "no",
			standard: "no",
			corporate: "yes",
		},
		{
			text: "Global indicies",
			free: "yes",
			student: "yes",
			standard: "yes",
			corporate: "yes",
		},
		{
			text: "Company profile information/Meta data",
			free: "5 stocks/day",
			student: "yes",
			standard: "yes",
			corporate: "yes",
		},
		{
			text: "Red flags",
			free: "no",
			student: "yes",
			standard: "yes",
			corporate: "yes",
		},
	],
	"Snapshots & analytics": [
		{
			text: "Market movers",
			free: "yes",
			student: "yes",
			standard: "yes",
			corporate: "yes",
		},
		{
			text: "Scatter plot (x,y)",
			free: "5 stocks/day",
			student: "yes",
			standard: "yes",
			corporate: "yes",
		},
		{
			text: "Analyst price targets",
			free: "5 stocks/day",
			student: "yes",
			standard: "yes",
			corporate: "yes",
		},
		{
			text: "Consensus Wall St estimates",
			free: "5 stocks/day",
			student: "yes",
			standard: "yes",
			corporate: "yes",
		},
		{
			text: "Earnings history & surprises",
			free: "5 stocks/day",
			student: "yes",
			standard: "yes",
			corporate: "yes",
		},
		{
			text: "Dividend summary",
			free: "5 stocks/day",
			student: "yes",
			standard: "yes",
			corporate: "yes",
		},
		{
			text: "ETF exposure",
			free: "5 stocks/day",
			student: "yes",
			standard: "yes",
			corporate: "yes",
		},
		{
			text: "ETF holdings",
			free: "5 stocks/day",
			student: "yes",
			standard: "yes",
			corporate: "yes",
		},
	],
	"News, filings & transcripts": [
		{
			text: "News from the web",
			free: "yes",
			student: "yes",
			standard: "yes",
			corporate: "yes",
		},
		{
			text: "Global market news",
			free: "yes",
			student: "yes",
			standard: "yes",
			corporate: "yes",
		},
		{
			text: "Company news",
			free: "no",
			student: "yes",
			standard: "yes",
			corporate: "yes",
		},
		{
			text: "Premium news and opinion",
			free: "no",
			student: "no",
			standard: "yes",
			corporate: "yes",
		},
		{
			text: "Company filings",
			free: "no",
			student: "no",
			standard: "yes",
			corporate: "yes",
		},
		{
			text: "Transcripts",
			free: "5 stocks/day",
			student: "5 stocks/day",
			standard: "yes",
			corporate: "yes",
		},
		{
			text: "Custom news screens",
			free: "no",
			student: "no",
			standard: "yes",
			corporate: "yes",
		},
		{
			text: "Document search",
			free: "no",
			student: "no",
			standard: "yes",
			corporate: "yes",
		},
		{
			text: "Social Media updates and news",
			free: "no",
			student: "yes",
			standard: "yes",
			corporate: "yes",
		},
		{
			text: "Get alerts",
			free: "no",
			student: "yes",
			standard: "yes",
			corporate: "yes",
		},
	],
	Support: [
		{
			text: "Email support",
			free: "Community",
			student: "Community",
			standard: "Standard email",
			corporate: "Priority email",
		},
	],
};
