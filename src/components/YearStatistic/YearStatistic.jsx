import React, { useState, useEffect } from "react";
import LineChart from "../LineChart/LineChart.jsx";

function YearStatistic() {
	const [data, setData] = useState([]);
	const [currentFactor, setCurrentFactor] = useState(0);

	useEffect(() => {
		async function getData() {
			const serverData = await fetch(
				"http://192.168.193.189:7000/dataset/cf2801fc-7e96-45b8-9b36-a9cefdcecb82.xlsx/yearsStat/",
				{
					method: "GET",
				}
			);
			const result = JSON.parse(await serverData.text());

			setData(result);
			console.log("state: ", result);
		}
		getData();
	}, []);

	function renderChart() {}

	return (
		<div>
			<div>
				<h1>Годовая статистика</h1>
				<select
					value={currentFactor}
					onChange={(e) => {
						setCurrentFactor(e.target.value);
					}}
				>
					{data.map(({ Factor }, id) => {
						return (
							<option key={id} value={id}>
								{Factor}
							</option>
						);
					})}
				</select>
				<button>Скачать</button>
			</div>
			{/* <LineChart
				data={{
					labels: Object.keys(data[currentFactor]).pop(),
					datasets: [
						{
							data: Object.values(data[currentFactor]).pop(),
						},
					],
				}}
				options={{}}
			/> */}
		</div>
	);
}

export default YearStatistic;
