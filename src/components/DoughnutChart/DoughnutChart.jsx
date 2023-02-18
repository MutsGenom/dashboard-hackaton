import React, { useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import DownloadChartButton from "../DownloadButtons/DownloadChartButton/DownloadChartButton";
import DownloadTableButton from "../DownloadButtons/DownloadTableButton/DownloadTableButton";

import styles from "./DoughnutChart.module.css";

function DoughnutChart({ style, width, heigth, data, options }) {
	let chartRef = useRef(null);

	return (
		<div style={style}>
			<Doughnut
				width={width}
				height={heigth}
				ref={chartRef}
				data={data}
				options={options}
			></Doughnut>
			<div className={styles.footer}>
				<DownloadChartButton chartRef={chartRef} />
				<DownloadTableButton chartRef={chartRef} />
			</div>
		</div>
	);
}

export default DoughnutChart;
