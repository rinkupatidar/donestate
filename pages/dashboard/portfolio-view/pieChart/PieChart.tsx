

import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styles from './index.module.scss'
import { round } from 'utilities/round'
interface PieChartProps {
    sectorDataForPieChart: [];
}



const PieChart: React.FC<PieChartProps> = ({ sectorDataForPieChart = [] }) => {

    // const roundedCashPercentage = cashPercentage.toFixed(2);
    // const roundedStockPercentage = stockPercentage.toFixed(2);
    // const roundedCashPercentage = cashPercentage ? cashPercentage.toFixed(2) : '0.00';
    // const roundedStockPercentage = stockPercentage ? stockPercentage.toFixed(2) : '0.00';


    const options = {
        chart: {
            type: 'pie',
            width: 200,
            height: 200,
            backgroundColor: '#0A0A0A',

        },
        title: {
            text: 'Sector Wise Allocation',
            style: {
                fontSize: '0.75rem',
                color: 'hsl(0, 0%, 48%)',
            }
        },

        tooltip: {
            valueSuffix: '%',

        },
        // subtitle: {
        //     text: 'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
        // },
        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: [{
                    enabled: true,
                    distance: 20
                }, {
                    enabled: true,
                    distance: -40,
                    format: '{point.percentage:.1f}%',
                    style: {
                        fontSize: '1.2em',
                        textOutline: 'none',
                        opacity: 0.7
                    },
                    filter: {
                        operator: '>',
                        property: 'percentage',
                        value: 10
                    }
                }]
            }
        },
        series: [
            {
                name: '',
                colorByPoint: true,
                data: sectorDataForPieChart
                // data: [
                //     // {
                //     //     name:"cash",
                //     //     // sliced: true,
                //     //     y: parseFloat(roundedCashPercentage), 
                //     //     color:"#ffa100"
                //     // },
                //     // {
                //     //     name:"stock",
                //     //     y: parseFloat(roundedStockPercentage),
                //     //     color:'#5d1600'
                //     // }
                //      // { name: 'cash', y: 55.02 },
                //     // { name: 'Fat', sliced: true, selected: true, y: 26.71 },
                //     // { name: 'Carbohydrates', y: 1.09 },
                //     // { name: 'Protein', y: 15.5 },
                //     // { name: 'Ash', y: 1.68 }

                // ]
            }
        ]
    };

    return (
        <div className={styles.bg} style={{ marginTop: "2px" }}  >
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default PieChart;
