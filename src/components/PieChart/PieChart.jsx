import React, { useRef } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import DownloadChartButton from "../DownloadButtons/DownloadChartButton/DownloadChartButton";
import DownloadTableButton from "../DownloadButtons/DownloadTableButton/DownloadTableButton";

import styles from "./PieChart.module.css";

function PieChart({ style, width, heigth, data, options }) {
	let chartRef = useRef(null);

	return (
		<div style={style}>
			<Pie
				width={width}
				height={heigth}
				ref={chartRef}
				data={data}
				options={options}
			></Pie>
			<div className={styles.footer}>
				<DownloadChartButton chartRef={chartRef} />
				<DownloadTableButton chartRef={chartRef} />
			</div>
		</div>
	);
}

export default PieChart;