import React, { useState, useEffect } from "react";
import DoughnutChart from "../DoughnutChart/DoughnutChart.jsx";
function Population() {
	const [data, setData] = useState();
	const [label, setLabel] = useState();
	const [options, setOptions] = useState();
	const [dataDough, setDataDough] = useState();
	const [currentOption, setCurrentOption] = useState();
	const [nameOption, setNameOption] = useState();

	useEffect(() => {
		async function getData() {
			const serverData = await fetch(
				"http://192.168.193.36:7000/dataset/c08dd52e-b96e-4b10-99a7-8acbb5c6f7a4.xlsx/test",
				{
					method: "GET",
				}
			);

			const result = JSON.parse(await serverData.text());

			setData(result);
			const mainOptions = Object.keys(result[0])[0];
			const label = [
				Object.keys(result[1])[1],
				Object.keys(result[1])[2],
			];

			const arrayOptions = [];
			for (const i in result) {
				arrayOptions.push(result[i][mainOptions]);
			}
			const arrayValues = [];
			for (const i in result) {
				const key = Object.values(result[i])[0];
				const array = [
					Object.values(result[i])[1],
					Object.values(result[i])[2],
				];

				const object = new Object();
				object[key] = array;

				arrayValues.push(object);
			}

			setData(arrayValues);
			setLabel(label);
			setOptions(arrayOptions);
			setDataDough(arrayValues[0][arrayOptions[0]]);
		}
		getData();
	}, []);

	useEffect(() => {
		try {
			console.log(data[currentOption][nameOption]);

			setDataDough(data[currentOption][nameOption]);
		} catch (error) {}
	}, [currentOption, nameOption]);

	return (
		<div>
			<div>
				<h1>Население России по возрасту</h1>
				<div>
					<div>
						<select
							name=""
							id=""
							onChange={(e) => {
								setCurrentOption(e.target.value);
								setNameOption(
									e.target.options[e.target.selectedIndex]
										.textContent
								);
							}}
						>
							{options
								? options.map((option, id) => {
										return (
											<option value={id}>{option}</option>
										);
								  })
								: null}
						</select>
					</div>

					<DoughnutChart
						width={347}
						heigth={135}
						data={{
							labels: label,
							datasets: [
								{
									data: dataDough,
									tension: 0.3,
									backgroundColor: ["#00429d", "#ffffe0"],
									borderColor: ["#00429d", "#ffffe0"],
									fill: true,
								},
							],
						}}
						options={{
							responsive: true,
							plugins: {
								legend: true,
							},
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default Population;
