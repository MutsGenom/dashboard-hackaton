import React, { useCallback } from "react";

import styles from '../DownloadButton.module.css'


function DownloadTableButton({ chartRef }) {
	const downloadTable = useCallback(() => {
		const link = document.createElement("a");
		link.download = "chart.png";
		link.href = chartRef.current.toBase64Image();
		link.click();
	}, []);

	return (
		<button className={styles.button} onClick={downloadTable}>
			<img src="/assets/table.svg" alt="" />
			<div className={styles.button_text}>
				<span>Скачать таблицу</span>
			</div>
		</button>
	);
}

export default DownloadTableButton;