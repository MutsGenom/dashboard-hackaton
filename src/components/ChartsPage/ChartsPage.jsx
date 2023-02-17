import { Route, Routes } from 'react-router-dom'
import Goodness from '../Goodness/Goodness'
import Form from '../Form/Form'
import Population from '../Population/Population'
import Header from '../Header/Header'

import styles from './ChartsPage.module.css'

function ChartsPage(){
    return (
        <div className={styles.chartsPage}>
            <Header/>
            <Routes>
				<Route path="/form" element={<Form/>}/>
				<Route path="/goodness" element={<Goodness/>}/>
				<Route path="/population" element={<Population/>}/>
			</Routes>
        </div>
    )
}

export default ChartsPage