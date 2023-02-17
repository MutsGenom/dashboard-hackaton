import React from "react";
import { NavLink } from "react-router-dom";

import styles from './Navigation.module.css'

const navigation = [
	{
		href: "/form",
		name: "Форма М1",
	},
	{
		href: "/goodness",
		name: "Добро",
	},
	{
		href: "/population",
		name: "Население",
	},
];

function Navigation() {
	return (
		<div className={styles.navigation}>
			<nav>
				<ul className={styles.ul}>
					{
						navigation.map(({index, href, name})=>{
							return(
								<li key={index}  className={styles.li}>
									<NavLink to={href}>{name}</NavLink>
								</li>
							)
						})
					}
				</ul>
			</nav>
		</div>
	);
}

export default Navigation;
