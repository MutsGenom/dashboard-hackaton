import React, { useCallback } from "react";

import styles from "./DownloadChartButton.module.css";

function DownloadChartButton({ inline_style, id, chartRef }) {
	const downloadChart = useCallback(() => {
		const link = document.createElement("a");
		link.download = "chart.png";
		link.href = chartRef.current.toBase64Image();
		link.click();
	}, []);

	return (
		<button style={inline_style} className={styles.button} onClick={downloadChart}>
			<img src="/assets/download.svg" alt="" />
		</button>
	);
}

export default DownloadChartButton;
