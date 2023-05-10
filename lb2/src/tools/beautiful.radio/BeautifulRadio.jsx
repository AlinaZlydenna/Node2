import styles from './beautiful.radio.module.css'
import {useEffect, useState} from "react";

const BeautifulRadio = ({
                            name, firstText, secondText, defaultValue = false, setValue = (v) => {
    }
                        }) => {
    const [state, setState] = useState(defaultValue);

    useEffect(() => {
        setValue(state)
    }, [state])

    return (
        <div className={styles.container}>
            <button type="button" className={[styles.button,
                (state ? styles.active : "")].join(' ')}
                    onClick={() => setState(true)}
            >{firstText}
            </button>
            <input hidden={true} type={'hidden'} name={name} value={state.toString()}/>
            <button type="button" className={[styles.button,
                (state ? "" : styles.active)].join(' ')}
                    onClick={() => setState(false)}>{secondText}
            </button>
        </div>
    )
}

export default BeautifulRadio