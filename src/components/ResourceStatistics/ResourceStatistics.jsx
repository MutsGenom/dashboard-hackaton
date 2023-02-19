import { getValue } from "@testing-library/user-event/dist/utils";
import React from "react";
import { useState, useEffect } from "react";
import DoughnutChart from "../DoughnutChart/DoughnutChart";
import PieChart from "../PieChart/PieChart";

import styles from "./ResourceStatistics.module.css";

function ResourceStatistics() {
	const [indicators, setIndicators] = useState([]);
	const [modules, setModules] = useState([]);

	const [keys, setKeys] = useState();

	const [currentFactorModule, setCurrentFactorModule] = useState(0);

	const [activeModule, setActiveModule] = useState();
	const [values, setValues] = useState();
	const [data, setData] = useState();

	useEffect(() => {
		async function getData() {
			const serverData = await fetch(
				"http://192.168.193.36:7000/dataset/page/cf2801fc-7e96-45b8-9b36-a9cefdcecb82.xlsx/title/Р7",
				{
					method: "GET",
				}
			);

			const result = JSON.parse(await serverData.text());
			const columnsName = result.titles;
			const data = result.content;

			const arrayIndicators = [];

			for (const el in data) {
				if (!arrayIndicators.includes(data[el][columnsName[3]])) {
					arrayIndicators.push(data[el][columnsName[3]]);
				}
			}

			const newArray = [];
			const arrayOption = [];
			const modulesArray = [];
			let counter = -1;
			let key = "";

			for (const el in arrayIndicators) {
				if (
					arrayIndicators[el].includes(
						"Общее количество региональных ресурсных центров поддержки добровольчества на территории субъекта Российской Федерации:"
					)
				) {
					continue;
				}
				if (
					arrayIndicators[el].includes(
						"Общая численность граждан, вовлеченных в добровольческую деятельность на территории субъекта Российской Федерации, включая вовлеченных центрами (сообществами, объединениями) поддержки добровольчества (волонтерства), по направлениям сферы деятельности: добровольческая (волонтерская) деятельность в области образования"
					)
				) {
					break;
				}

				if (arrayIndicators[el].includes(":")) {
					const object = new Object();
					object[arrayIndicators[el].slice(0, -1)] = [];
					newArray.push(object);
					counter++;
					key = arrayIndicators[el].slice(0, -1);
					modulesArray.push(key);
					continue;
				}

				arrayOption.push(arrayIndicators[el]);
				newArray[counter][key].push(arrayIndicators[el]);
			}

			const arrayValues = [];
			for (const op of arrayOption) {
				const object = new Object();
				object[op] = 0;
				arrayValues.push(object);
			}

			for (const el in data) {
				for (const i in arrayOption) {
					if (data[el][columnsName[3]] == arrayOption[i]) {
						arrayValues[i][arrayOption[i]] +=
							data[el][columnsName[6]];
						break;
					}
				}
			}

			setValues(arrayValues);
			modulesArray.sort();
			setModules(modulesArray);
			setIndicators(newArray);
			setActiveModule(modulesArray[0]);
			setKeys(newArray[0][modulesArray[0]]);
		}
		getData();
	}, []);

	useEffect(() => {
		try {
			const array = [];
			for (const el in keys) {
				for (const i in values) {
					if (values[i][keys[el]]) {
						array.push(values[i][keys[el]]);
					}
				}
			}
			setData(array);
		} catch (error) {}
	}, [activeModule]);

	return (
		<div className={styles.wrap}>
			<div className={styles.header}>
				<h1>Диаграмма волонтерства</h1>
				<select
					className={styles.selectModule}
					value={currentFactorModule}
					onChange={(e) => {
						setCurrentFactorModule(e.target.value);
						setActiveModule(
							e.target.options[e.target.selectedIndex].textContent
						);
						setKeys(
							indicators[e.target.value][
								e.target.options[e.target.selectedIndex]
									.textContent
							]
						);
					}}
				>
					{modules.map((module, id) => {
						return (
							<option key={id} value={id}>
								{module}
							</option>
						);
					})}
				</select>
			</div>
			<PieChart
				data={{
					labels: keys,
					datasets: [
						{
							data: data,
							tension: 0.3,
							backgroundColor: [
								"#9d7de0",
								"#a588e3",
								"#ad93e5",
								"#b69ee8",
								"#bea8ea",
								"#c6b3ed",
								"#cebef0",
								"#d6c9f2",
								"#ded4f5",
								"#e7dff7",
								"#efe9fa",
								"#f7f4fc",
							],
							borderColor: [
								"#9d7de0",
								"#a588e3",
								"#ad93e5",
								"#b69ee8",
								"#bea8ea",
								"#c6b3ed",
								"#cebef0",
								"#d6c9f2",
								"#ded4f5",
								"#e7dff7",
								"#efe9fa",
								"#f7f4fc",
							],
							fill: true,
						},
					],
				}}
				options={{
					responsive: true,
					plugins: {
						// legend: true,
					},
				}}
			/>
		</div>
	);
}

export default ResourceStatistics;
