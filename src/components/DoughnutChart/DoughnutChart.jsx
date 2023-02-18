import React, { useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

import DownloadChartButton from "../DownloadChartButton/DownloadChartButton";

function DoughnutChart({ width, height, data, options }) {
	let chartRef = useRef(null);

	return (
		<div>
			<Doughnut
				width={width}
				height={height}
				ref={chartRef}
				data={data}
				options={options}
			/>
			<DownloadChartButton chartRef={chartRef} />
		</div>
	);
}

export default DoughnutChart;
