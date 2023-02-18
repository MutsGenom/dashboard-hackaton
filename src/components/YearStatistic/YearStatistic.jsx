import React, { useState, useEffect } from "react";
import LineChart from "../LineChart/LineChart.jsx";

import styles from "./YearStatistic.module.css";

function YearStatistic() {
	const [data, setData] = useState([]);
	const [currentFactor, setCurrentFactor] = useState(0);

	const [keys, setKeys] = useState([]);
	const [values, setValues] = useState([]);
	const [label, setLabel] = useState("");

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
		}
		getData();
	}, []);

	useEffect(() => {
		try {
			setKeys(Object.keys(data[currentFactor]).slice(0, -1));
			setValues(Object.values(data[currentFactor]).slice(0, -1));
			setLabel(Object.values(data[currentFactor]).slice(-1));
		} catch (er) {}
	}, [currentFactor, data]);

	return (
		<div className={styles.wrap}>
			<div className={styles.header}>
				<h1>Статистика по годам</h1>
				<select
					className={styles.select}
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
			</div>
			<LineChart
				className={styles.canvas}
				width={347}
				data={{
					labels: keys,
					datasets: [
						{
							label,
							data: values,
							tension: 0.3,
							backgroundColor: "rgb(157, 125, 224, 0.2)",
							borderColor: "#9D7DE0",
							fill: true,
						},
					],
				}}
				options={{
					responsive: true,
					plugins: {
						legend: false,
					},
				}}
			/>
		</div>
	);
}

export default YearStatistic;
