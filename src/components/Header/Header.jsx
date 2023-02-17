import styles from './Header.module.css'

function Header(){    
    return (
        <div className={styles.header}>
            <div className={styles.div_title}>
                <h1>Аналитика</h1>
            </div>
            <div className={styles.div_button}>
                <button className={styles.button} onClick={()=>{
                    console.log('Кнопка нажата');
                }}>
                    <span>Выбрать файл</span>
                </button>
            </div>
        </div>
    )
}

export default Header