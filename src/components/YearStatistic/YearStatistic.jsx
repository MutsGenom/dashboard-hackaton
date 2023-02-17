import React, { useState, useEffect } from "react";
import LineChart from "../LineChart/LineChart.jsx";

function YearStatistic() {
	const [data, setData] = useState([]);
	const [currentFactor, setCurrentFactor] = useState(0);

	const [keys, setKeys] = useState([])
	const [values, setValues] = useState([])
	const [label, setLabel] = useState("")

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

	useEffect(()=>{
		// console.log(curre)
		try{
			if(Object.keys(data[currentFactor]) ){
				setKeys(Object.keys(data[currentFactor]).slice(0,-1))
				setValues(Object.values(data[currentFactor]).slice(0,-1))
				setLabel(Object.values(data[currentFactor]).slice(-1))
			}else{
				console.log('nthn')
			}
		}catch(er){

		}
	},[currentFactor])

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
			<LineChart
				data={{
					labels: keys,
					datasets: [
						{
							label,
							data: values,
						},
					],
				}}
				options={{}}
			/>
		</div>
	);
}

export default YearStatistic;
