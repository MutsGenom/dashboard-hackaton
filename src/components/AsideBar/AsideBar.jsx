import React from "react";
import Navigation from "./Navigation/Navigation";

import styles from './AsideBar.module.css'

function AsideBar() {

	return (
		<aside className={styles.asideBar}>
			<div className={styles.asideBar_logo}>
				<img src="/assets/logo.svg" alt="Логотип" className="logo"/>
			</div>
			<Navigation/>
		</aside>
	);
}

export default AsideBar;
