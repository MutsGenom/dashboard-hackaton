import React, { useEffect, useState, useContext } from "react";
import styles from "./BudgetAllocationStatistic.module.css";
import BarChart from "../BarChart/BarChart.jsx";
import { AppContext } from "../../context/context";

function BudgetAllocationStatistic() {
	const [{ link }] = useContext(AppContext);
	const [data, setData] = useState([]);
	const [currentRegion, setCurrentRegion] = useState(0);
	const [currentMetric, setCurrentMetric] = useState(0);
	const [keys, setKeys] = useState([]);
	const [values, setValues] = useState([]);
	const [label, setLabel] = useState("");
	const [regions, setRegions] = useState([]);
	const [sortedByRegion, setSortedByRegion] = useState([]);

	const metrics = [
		" Бюджет МО, руб ",
		" Бюджет СРФ, руб ",
		" Бюджет грантов, руб ",
		" Кол-во грантов ",
		" Количество детских и молодeжных общественных объединений, работающих по данному ",
		" Численность молодeжи, задействованной в программных мероприятиях по направлению ",
	];

	useEffect(() => {
		async function getData() {
			const serverData = await fetch(
				`http://192.168.193.36:7000/dataset/page/${link}/xlsx/Р1`,
				{
					method: "GET",
				}
			);
			const result = JSON.parse(await serverData.text());
			setData(result);

			const regionsData = await fetch(
				`http://192.168.193.36:7000/dataset/${link}/regions`,
				{
					method: "GET",
				}
			);
			const regions = JSON.parse(await regionsData.text());
			setRegions(regions);

			let valuesToChart = [];
			let labelToChart = [];
			sortedByRegion.forEach((el) => {
				if (
					!el[
						"Направления реализации государственной молодeжной политики"
					].startsWith("  ")
				) {
					valuesToChart.push(el[metrics[currentMetric]]);
					if (
						!el[
							"Направления реализации государственной молодeжной политики"
						].endsWith(", в том числе:")
					) {
						labelToChart.push(
							el[
								"Направления реализации государственной молодeжной политики"
							]
						);
					} else {
						labelToChart.push(
							el[
								"Направления реализации государственной молодeжной политики"
							].replace(", в том числе:", "")
						);
					}
				}
			});
			console.log(sortedByRegion);
			setValues(sortedByRegion[0][metrics[0]]);
			setKeys(labelToChart);
		}
		getData();
	}, [link]);

	useEffect(() => {
		let valuesToChart = [];
		let labelToChart = [];
		sortedByRegion.forEach((el) => {
			if (
				!el[
					"Направления реализации государственной молодeжной политики"
				].startsWith("  ")
			) {
				valuesToChart.push(el[metrics[currentMetric]]);
				if (
					!el[
						"Направления реализации государственной молодeжной политики"
					].endsWith(", в том числе:")
				) {
					labelToChart.push(
						el[
							"Направления реализации государственной молодeжной политики"
						]
					);
				} else {
					labelToChart.push(
						el[
							"Направления реализации государственной молодeжной политики"
						].replace(", в том числе:", "")
					);
				}
			}
		});
		// console.log(valuesToChart);
		// console.log(labelToChart);
		setValues(valuesToChart);
		setKeys(labelToChart);
	}, [currentRegion, currentMetric, data]);

	function chooseRegion(region) {
		let sortedByRegion1 = [];
		data.forEach((el) => {
			if (el["Регион"] == regions[region]) {
				sortedByRegion1.push(el);
			}
		});
		setSortedByRegion(sortedByRegion1);
	}

	return (
		<div className={styles.wrap}>
			<div className={styles.header}>
				<h1>Распределение бюджета</h1>
				<select
					className={styles.select}
					value={currentRegion}
					onChange={(e) => {
						setCurrentRegion(e.target.value);
						chooseRegion(e.target.value);
					}}
				>
					{regions.map((region, id) => {
						return (
							<option key={id} value={id}>
								{region}
							</option>
						);
					})}
				</select>

				<select
					className={styles.select}
					value={currentMetric}
					onChange={(e) => {
						setCurrentMetric(e.target.value);
					}}
				>
					{metrics.map((metric, id) => {
						return (
							<option key={id} value={id}>
								{metric}
							</option>
						)
					})}
				</select>
			</div>
			<BarChart
				width={700}
				height={500}
				data={{
					labels: keys,
					datasets: [
						{
							data: values,
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
	);
}

export default BudgetAllocationStatistic;
