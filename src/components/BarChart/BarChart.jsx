import React, { useRef } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

import DownloadChartButton from "../DownloadButtons/DownloadChartButton/DownloadChartButton.jsx";
import DownloadTableButton from "../DownloadButtons/DownloadTableButton/DownloadTableButton.jsx";

function BarChart({ data, options }) {
	let chartRef = useRef(null);

	return (
		<div>
			<Bar ref={chartRef} data={data} options={options}></Bar>
			<DownloadChartButton chartRef={chartRef} />
			<DownloadTableButton chartRef={chartRef} />
		</div>
	);
}

export default BarChart;
