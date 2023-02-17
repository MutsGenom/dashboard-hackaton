import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

function BarChart({ data, options }) {
	return (
		<div>
			<Bar data={data} options={options}></Bar>
		</div>
	);
}

export default BarChart;
