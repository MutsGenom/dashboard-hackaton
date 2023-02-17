import React from "react";

function DownloadChartButton({ chartRef }) {
	const downloadChart = useCallback(() => {
		const link = document.createElement("a");
		link.download = "chart.png";
		link.href = chartRef.current.toBase64Image();
		link.click();
	}, []);

	return <button onClick={downloadChart}>Скачать график</button>;
}

export default DownloadChartButton;
