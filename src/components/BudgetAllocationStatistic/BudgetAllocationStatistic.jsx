import React, { useEffect, useState } from 'react'
import styles from "./BudgetAllocationStatistic.module.css";
import BarChart from "../BarChart/BarChart.jsx"

function BudgetAllocationStatistic() {
    const [data, setData] = useState([]);
	const [currentRegion, setCurrentRegion] = useState(0);
	const [currentMetric, setCurrentMetric] = useState(0);

	const [keys, setKeys] = useState([]);
	const [values, setValues] = useState([]);
	const [label, setLabel] = useState("");

	const [sortedByRegion, setSortedByRegion] = useState([])

	const metrics = [
		"Бюджет МО, руб",
		"Бюджет СРФ, руб",
		"Бюджет грантов, руб",
		"Кол-во грантов",
		"Количество детских и молодeжных общественных объединений, работающих по данному ",
		"Направления реализации государственной молодeжной политики",
		"Численность молодeжи, задействованной в программных мероприятиях по направлению"
	]

	const [regions,setRegions] = useState([])


	function chooseRegion(){
		let sortedByRegion = [];
		data.forEach((el,index) => {
			if(el["Регион"] == regions[currentRegion]){
				sortedByRegion.push(el)
			}
		});
		setSortedByRegion(sortedByRegion)
	}

    useEffect(() => {
		async function getData() {
			const serverData = await fetch(
				"http://192.168.193.189:7000/dataset/page/cf2801fc-7e96-45b8-9b36-a9cefdcecb82.xlsx/xlsx/Р1",
				{
					method: "GET",
				}
			);
			const result = JSON.parse(await serverData.text());
			setData(result);


			const regionsData = await fetch(
				"http://192.168.193.189:7000/dataset/cf2801fc-7e96-45b8-9b36-a9cefdcecb82.xlsx/regions",
				{
					method: "GET",
				}
			);
			const regions = JSON.parse(await regionsData.text());
			setRegions(regions)
		}
		getData();
	}, []);


	useEffect(() => {
		let valuesToChart = [];
		let labelToChart = [];

		sortedByRegion.forEach((el,index)=>{
			valuesToChart.push(el[metrics[currentMetric]])
			labelToChart.push(el["Направления реализации государственной молодeжной политики"])
			console.log(el["Направления реализации государственной молодeжной политики"])
		})
		setValues(valuesToChart)
		setKeys(labelToChart)
	}, [currentRegion,currentMetric, data]);


  return (
    <div className={styles.wrap}>
			<div className={styles.header}>
				<h1>Статистика по годам</h1>
				<select
					className={styles.select}
					value={currentRegion}
					onChange={(e) => {
						setCurrentRegion(e.target.value);
						chooseRegion()
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
					{metrics.map((metric , id) => {
						return (
							<option key={id} value={id}>
								{metric}
							</option>
						);
					})}
				</select>
			</div>
			<BarChart
				className={styles.canvas}
				width={1047}
				height={1547}
				data={{
					labels: keys,
					datasets: [
						{
							label,
							data: values,
							tension: 0.3,
						},
					],
				}}
				options={{
					responsive: true,
					plugins: {
						legend: false,
					},
					indexAxis:"y",
					maintainAspectRatio: false
				}}
			/>
		</div>
  )
}

export default BudgetAllocationStatistic;
