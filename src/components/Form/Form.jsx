import ResourceStatistics from "../ResourceStatistics/ResourceStatistics.jsx";
import YearStatistic from "../YearStatistic/YearStatistic.jsx";
import BudgetAllocationStatistic from "../BudgetAllocationStatistic/BudgetAllocationStatistic.jsx";

import styles from "./Form.module.css";

function Form() {
	return (
		<div className={styles.form}>
			<ResourceStatistics />
			<YearStatistic />
			<BudgetAllocationStatistic />
		</div>
	);
}

export default Form;
