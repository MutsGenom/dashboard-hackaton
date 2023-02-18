import React, { useCallback } from "react";

import styles from '../DownloadButton.module.css'

function DownloadChartButton({ chartRef }) {
	const downloadChart = useCallback(() => {
		const link = document.createElement("a");
		link.download = "chart.png";
		link.href = chartRef.current.toBase64Image();
		link.click();
	}, []);

	return (
		<button className={styles.button} onClick={downloadChart}>
			<img src="/assets/graph.svg" alt="" />
			<div className={styles.button_text}>
				<span>Скачать график</span>
			</div>
		</button>
	);
}

export default DownloadChartButton;
