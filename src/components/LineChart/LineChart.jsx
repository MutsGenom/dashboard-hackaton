import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

import DownloadChartButton from "../DownloadButtons/DownloadChartButton/DownloadChartButton";
import DownloadTableButton from "../DownloadButtons/DownloadTableButton/DownloadTableButton";

import styles from './LineChart.module.css'

function LineChart({ width, heigth, data, options }) {
	let chartRef = useRef(null);

	return (
		<div>
			<Line
				width={width}
				height={heigth}
				ref={chartRef}
				data={data}
				options={options}
			></Line>
			<div className={styles.footer}>
				<DownloadChartButton chartRef={chartRef} />
				<DownloadTableButton chartRef={chartRef}/>
			</div>
		</div>
	);
}

export default LineChart;
