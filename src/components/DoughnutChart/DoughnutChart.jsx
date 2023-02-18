import React, { useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
// import DownloadChartButton from "../DownloadChartButton/DownloadChartButton";
import styles from './DoughnutChart.module.css'

function DoughnutChart({ data, options }) {
	let chartRef = useRef(null);

	return (
		<div className={styles.footer_chart}>
			<Doughnut ref={chartRef} data={data} options={options} />
			{/* <DownloadChartButton chartRef={chartRef} /> */}
		</div>
	);
}

export default DoughnutChart;
