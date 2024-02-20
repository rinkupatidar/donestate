import MainSection from "components/pages/stock/MainSection";
import MainSectionView from "./MainSectionView";
import style from './index.module.scss'
const Index = () => {
	return (
		<div className="columns px-3">
			<div className="column is-12">
			{/* <div style={{marginTop: '1.0rem'}} className={style.port_section}> */}
			<div style={{marginTop: '0.5rem'}}>
				<MainSectionView />
				</div>
			</div>
			{/* <div className="column is-2">
				<RightPanelAds />
			</div> */}
		</div>
	);
};
export default Index;
