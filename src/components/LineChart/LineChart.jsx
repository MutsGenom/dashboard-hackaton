import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

import DownloadChartButton from "../DownloadChartButton/DownloadChartButton.jsx";

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
			<DownloadChartButton chartRef={chartRef} />
		</div>
	);
}

export default LineChart;
