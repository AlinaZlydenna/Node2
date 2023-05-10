import styles from './between.checkbox.module.css'
import {useEffect, useRef, useState} from "react";

const BetweenCheckbox = ({labelText, inputName, right, left}) => {
    const [one, setOne] = useState(false)
    const [two, setTwo] = useState(false)
    const elementOne = useRef(null)
    const elementTwo = useRef(null)
    const hideInput = useRef(null)

    const isOne = () => {
        if (one) {
            return hideInput.current.value = "" + true
        }
        if (two) {
            return hideInput.current.value = false
        }
        hideInput.current.value = null
    }

    const changeOne = ({target}) => {
        setOne(target.checked)
    }

    const changeTwo = ({target}) => {
        setTwo(target.checked)
    }

    useEffect(() => {
        if (one && two) {
            elementOne.current.checked = false
            elementTwo.current.checked = false
            setOne(false)
            setTwo(false)

        }
        isOne()
    }, [one, two])


    return (
        <div className={styles.betweenCheckBoxContainerWithLabel}>
            <label className={styles.betweenLabel}>{labelText}</label>
            <div className={styles.betweenCheckBoxContainer}>
                <div className={styles.betweenCheckBoxElement}>
                    <input type={'checkbox'} onChange={changeOne} ref={elementOne}
                           id={right?.value?.id}  {...right.value}/>
                    <label htmlFor={right?.value?.id}>{right.text}</label>
                </div>
                <input type={"hidden"} name={inputName} ref={hideInput}/>
                <div className={styles.betweenCheckBoxElement}>
                    <input type={'checkbox'} onChange={changeTwo} ref={elementTwo}
                           id={left?.value?.id} {...left.value}/>
                    <label htmlFor={left?.value?.id}>{left.text}</label>
                </div>

            </div>
        </div>

    )
}

export default BetweenCheckbox