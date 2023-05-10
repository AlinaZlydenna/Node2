import styles from './between.input.style.module.css'

const BetweenInput = ({right, left, label, labelText}) => {
    return (
        <div className={styles.betweenInputContainer}>
            <label {...label}>{labelText}</label>
            <div className={styles.betweenInputContainerTwoInputs}>

                <input {...left}/>
                <input {...right}/>
            </div>
        </div>
    )
}

export default BetweenInput