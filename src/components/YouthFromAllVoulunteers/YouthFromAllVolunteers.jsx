import React, { useState, useEffect } from "react";
import DoughnutChart from "../DoughnutChart/DoughnutChart";

import styles from "./YouthFormAllVolunteers.module.css";

function YouthFromAllVolunteersjsxjsx() {
	const [youthVolunteers, setYouthVolunteers] = useState(0);


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
			console.log(await servData.json());
			const resp = await servData.json();

			const youthPrecent =
				resp.statistics.agePeriodsPercentage["до 18"] +
				resp.statistics.agePeriodsPercentage["18 - 24"] +
				resp.statistics.agePeriodsPercentage["25 - 34"];
			setYouthVolunteers(youthPrecent);
		}
		getData();
	}, []);

	return (
		<div className={styles.wrap}>
				<h1>Процент молодежи среди всех волонтеров</h1>
				<DoughnutChart
				style={{
					width: '300px'
					
				}}
					data={{
						labels: ["Молодёжь", "Остальные"],
						datasets: [
							{
								label: "Процент молодежи среди всех волонтеров",
								data: [youthVolunteers, 100 - youthVolunteers],
								backgroundColor: ['#9d7de0','#f7f4fc'],
								borderColor: ['#9d7de0','#f7f4fc']
							},
						],
					}}
				/>
		</div>
		
	);
}

export default YouthFromAllVolunteersjsxjsx;
