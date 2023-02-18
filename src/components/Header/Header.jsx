import styles from "./Header.module.css";

function Header() {
	return (
		<div className={styles.header}>
			<span className={styles.title}>Аналитика</span>
			<button className={styles.button}>Выбрать файл</button>
		</div>
	);
}

export default Header;
