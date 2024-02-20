import Highcharts from "highcharts/highstock";

const importHighChartsModule = (data: any[]) => {
	data.map(async (item) => {
		if (item.moduleToImport)
			import(`highcharts/indicators/${item.moduleToImport}.js`).then((mod) => {
				mod.default(Highcharts);
			});
	});
};
export default importHighChartsModule;
