import Link from "next/link";
import { ROUTES } from "../../../constants";
import styles from "./index.module.scss";
interface TopBarProps {}

const TopBarLogin = ({}: TopBarProps) => {
	return (
		<div className={styles.container}>
			<div className={styles.item_dropdown}>
				<a className="navbar-link" style={{fontSize:"16px"}}>Solutions</a>
				
				<div className="navbar-dropdown">
				<div className={styles.Maxwidth} style={{ padding:'0rem 3rem'}}>
					<div className="navbar-dropdown-wrapper">
					
						<div>
							<div className="navbar-item-new" style={{fontSize:"16px"}}><Link href="/individual-investor"><p>Individual Investor</p>
							</Link></div>
							<div className="navbar-item-new" style={{fontSize:"16px"}}><Link href="/portfolio-management"><p>Portfolio Management</p></Link> </div>
							<div className="navbar-item-new" style={{fontSize:"16px"}}>
								<Link href="/publish-work"><p>Publish Your Work</p></Link></div>
							<div className="navbar-item-new" style={{fontSize:"16px"}}><Link href="/collaboration"><p>Collaboration for Corporates</p></Link></div>
							{/* <div className={styles.navbarItemNew} style={{fontSize:"16px"}}><Link href="/individual-investor"><p>Individual Investor</p>
							</Link></div>
							<div className={styles.navbarItemNew}  style={{fontSize:"16px"}}><Link href="/portfolio-management"><p>Portfolio Management</p></Link> </div>
							<div className={styles.navbarItemNew}  style={{fontSize:"16px"}}>
								<Link href="/publish-work"><p>Publish Your Work</p></Link></div>
							<div className={styles.navbarItemNew}  style={{fontSize:"16px"}}><Link href="/collaboration"><p>Collaboration for Corporates</p></Link></div> */}
						</div>
				
					</div>
				</div>
				</div>
			</div>
			<div className={styles.item_dropdown}>
				<a className="navbar-link" style={{fontSize:"16px"}}>Platform</a>
				<div className="navbar-dropdown">
				<div className={styles.Maxwidth} style={{ padding:'0rem 3rem'}}>
					<div className="navbar-dropdown-wrapper">
						<div>
							<div className="navbar-item-new" style={{fontSize:"16px"}}><Link href="/feature"><p>Features</p></Link></div>
							<div className="navbar-item-new" style={{fontSize:"16px"}}>
								<Link href="/data-coverage" ><p>Data Coverage</p></Link></div>
							{/* <div className="navbar-item-new">ANALYSIS & VISUALIZATION</div>
							<div className="navbar-item-new">RESEARCH MANAGEMENT</div>
							<div className="navbar-item-new">Notetaking and Collaboration</div> */}
						</div>
						</div>
					</div>
				</div>
			</div>
			
			<div className={styles.item} style={{fontSize:"16px"}}>
			Knowledge center
			</div>
			<div className={styles.item} style={{fontSize:"16px"}}> 
			<Link href="/pricing">
			<p>Pricing</p>
			</Link>
			</div>
			<div className={styles.item} style={{fontSize:"16px"}}>
			<Link href="/login">
            <p>Login</p>
          </Link>
		  </div>
		</div>
	);
};
export default TopBarLogin;
