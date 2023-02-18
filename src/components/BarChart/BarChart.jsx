import React, { useRef } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

import DownloadChartButton from "../DownloadButtons/DownloadChartButton/DownloadChartButton.jsx";
import DownloadTableButton from "../DownloadButtons/DownloadTableButton/DownloadTableButton.jsx";

import styles from './BarChart.module.css'

function BarChart({ data, options }) {
	let chartRef = useRef(null);

	return (
		<div className={styles.barChart}>
			<Bar ref={chartRef} data={data} options={options}></Bar>
			<div className={styles.buttons}>
				<DownloadChartButton chartRef={chartRef} />
				<DownloadTableButton chartRef={chartRef} />
			</div>
		</div>
	);
}

export default BarChart;
