import Link from "next/link";
import { ROUTES } from "../../../constants";
import styles from "./index.module.scss";
interface TopBarProps {}

const TopBar = ({}: TopBarProps) => {
	return (
		<div className={styles.container}>
			<div className={styles.item_dropdown}>
				<a className="navbar-link">Solutions</a>
				<div className="navbar-dropdown">
					<div className="navbar-dropdown-wrapper">
						<div className="left">
							<div className="navbar-item">Individual Investor</div>
							<div className="navbar-item">Portfolio Management </div>
							<div className="navbar-item">Publish your work</div>
							<div className="navbar-item">Collaboration for Corporates</div>
						</div>
						<div className="right ">
							<div className="columns">
								<div className="column">
									<p className="is-size-5">Guide: Financial Data Visualization and Analysis</p>
									<button className="button is-info has-tw-bold mt-5">Get the Guide</button>
								</div>
								<div className="column">
									<figure className="image is-5by3">
										<img
											className="fit-img"
											src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
											alt=""
										/>
									</figure>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.item_dropdown}>
				<a className="navbar-link">Platform</a>
				<div className="navbar-dropdown">
					<div className="navbar-dropdown-wrapper">
						<div className="left">
							<div className="navbar-item">SEARCH</div>
							<div className="navbar-item">ANALYSIS & VISUALIZATION</div>
							<div className="navbar-item">RESEARCH MANAGEMENT</div>
							<div className="navbar-item">Notetaking and Collaboration</div>
						</div>
						<div className="right ">
							<div className="columns">
								<div className="column">
									<p className="is-size-5">Guide: Financial Data Visualization and Analysis</p>
									<button className="button is-info has-tw-bold mt-5">Get the Guide</button>
								</div>
								<div className="column">
									<figure className="image is-5by3">
										<img
											className="fit-img"
											src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
											alt=""
										/>
									</figure>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.item}>
				<Link href={ROUTES.PRICING}>Why DoneStat?</Link>
			</div>
			<div className={styles.item}>Knowledge Center</div>

			<div className={styles.item}>
				<Link href={ROUTES.PRICING}>Pricing</Link>
			</div>
		</div>
	);
};
export default TopBar;
