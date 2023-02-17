import AsideBar from "./components/AsideBar/AsideBar";
import ChartsPage from "./components/ChartsPage/ChartsPage";

import styles from "./App.module.css";

function App() {
	return (
		<div className={styles.App}>
			<AsideBar />
			<ChartsPage />
		</div>
	);
}

export default App;
