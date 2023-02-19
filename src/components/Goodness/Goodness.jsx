import React from "react";
import AreasVolunteering from "../AreasVolunteering/AreasVolunteering.jsx";
import YouthFromAllVolunteers from "../YouthFromAllVoulunteers/YouthFromAllVolunteers.jsx";

import styles from "./Goodness.module.css";

function Goodness() {
	return (
		<div className={styles.goodness}>
			<YouthFromAllVolunteers />
			<AreasVolunteering />
		</div>
	);
}

export default Goodness;
