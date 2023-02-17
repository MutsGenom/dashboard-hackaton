import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

import DownloadChartButton from "../DownloadChartButton/DownloadChartButton.jsx";

function LineChart({ data, options }) {
	let chartRef = useRef(null);

	return (
		<div>
			<Line ref={chartRef} data={data} options={options}></Line>
			<DownloadChartButton chartRef={chartRef} />
		</div>
	);
}

export default LineChart;
