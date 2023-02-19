import React, { useState, useEffect } from "react";
import BarChart from "../BarChart/BarChart";

import styles from "./AreasVolunteering.module.css";

function AreasVolunteering() {
	const [categories, setCategories] = useState();
	const [statistics, setStatistics] = useState();
	const [currentCategory, setCurrentCategory] = useState(0);
	const [nameCategory, setNameCategory] = useState();
	const [keys, setKeys] = useState();
	const [values, setValues] = useState();

	const rusCategory = ["Волонтёры", "Организаторы", "Мероприятия", "Проекты"];

	useEffect(() => {
		async function getData() {
			const servData = await fetch(
				"https://dobro.ru/api/v2/analytics/get",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const resp = await servData.json();

			const statistics = resp.statistics.chartCategories;
			const categories = Object.keys(statistics);
			setCategories(categories.slice(0, -1));
			setStatistics(statistics);
			setCurrentCategory(0);
			setNameCategory(categories[0]);
		}
		getData();
	}, []);

	useEffect(() => {
		try {
			const obj = statistics[nameCategory];
			const keys = Object.keys(obj);
			const values = Object.values(obj);

			setKeys(keys);
			setValues(values);
		} catch (error) {}
	}, [currentCategory, nameCategory]);

	return (
		<div>
			<div className={styles.wrap}>
				<div className={styles.header}>
					<h1>Направления волонтерства</h1>
					<div>
						<select
							name=""
							id=""
							onChange={(e) => {
								setCurrentCategory(e.target.value);
								setNameCategory(
									categories[e.target.selectedIndex]
								);
							}}
						>
							{categories
								? rusCategory.map((category, id) => {
										return (
											<option key={id} value={id}>
												{category}
											</option>
										);
								  })
								: null}
						</select>
					</div>
				</div>
				<BarChart
					width={300}
					height={300}
					data={{
						labels: keys,
						datasets: [
							{
								data: values,
								backgroundColor: "#9d7de0",
								borderColor: "#9d7de0",
							},
						],
					}}
					options={{
						responsive: true,
						plugins: {
							legend: false,
						},
						indexAxis: "y",
					}}
				/>
			</div>
		</div>
	);
}

export default AreasVolunteering;
