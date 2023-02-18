import React, { useRef } from "react";

import styles from "./Header.module.css";

function Header() {
	const filePicker = useRef(null);

	async function handleChange(event) {
		const file = event.target.files[0];
		const formData = new FormData();
		formData.append("extension", "xlsx");
		formData.append("dataset", file);

		const res = await fetch("http://192.168.193.189:7000/dataset", {
			method: "POST",
			body: formData,
			redirect: "follow",
		});
		const data = await res.text();
		localStorage.setItem("fileName", data);
	}

	function handlePick() {
		filePicker.current.click();
	}

	return (
		<div className={styles.header}>
			<div className={styles.div_title}>
				<h1>Аналитика</h1>
			</div>
			<div className={styles.div_button}>
				<input
					type="file"
					accept=".xlsx"
					ref={filePicker}
					className={styles.hide}
					onChange={handleChange}
				/>
				<button className={styles.button} onClick={handlePick}>
					<span>Выбрать файл</span>
				</button>
			</div>
		</div>
	);
}

export default Header;
