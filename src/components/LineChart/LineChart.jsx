import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import  styles from "./LineChart.css"

import DownloadChartButton from "../DownloadChartButton/DownloadChartButton.jsx";

function LineChart({inline_style, width, heigth, data, options }) {
	let chartRef = useRef(null);

	return (
		<div className="lineChartCont">
			<Line
				width={width}
				height={heigth}
				ref={chartRef}
				data={data}
				options={options}
			></Line>
			<DownloadChartButton inline_style={inline_style} chartRef={chartRef} />
		</div>
	);
}

export default LineChart;
