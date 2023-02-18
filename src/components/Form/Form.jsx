import ResourceStatistics from "../ResourceStatistics/ResourceStatistics.jsx";
import YearStatistic from "../YearStatistic/YearStatistic.jsx";

import styles from './Form.module.css'

function Form() {
	return (
		<div className={styles.form}>
			{/* <YearStatistic /> */}
			<ResourceStatistics/>
		</div>
	);
}

export default Form;
