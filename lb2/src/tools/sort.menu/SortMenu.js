import {useState} from "react";
import styles from './sort.menu.style.module.css'

const SortMenu = ({options,}) => {
    const [directory, setDirectory] = useState(true)

    const changeDirectory = () => {
        setDirectory(!directory)
    }

    return <div className={styles.establishmentSortContainer}>
        <h3>Sort</h3>
        <div className={styles.establishmentSortButtonContainer}>
            <select name={'sortColumn'}>
                {
                    options.map(op => <option value={op.value} key={op.value}>{op.text}</option>)
                }
            </select>
            <input type={'hidden'} value={directory.toString()} name={'direction'}/>
            <button onClick={changeDirectory} type={'button'}>{directory ? 'ᐱ' : 'ᐯ'}</button>
        </div>

    </div>
}

export default SortMenu