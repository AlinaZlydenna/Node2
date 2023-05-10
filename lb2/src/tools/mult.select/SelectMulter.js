import {useRef, useState} from "react";

import style from './select.module.css'

const SelectMulter = ({
                          options,
                          name,
                          activeOptionClassName = style.activeOption,
                          optionClass = '',
                          defaultText = 'Choose your option',
                          customClassName = style.selectMulter,
                          defaultValue = 'DEFAULT'
                      }) => {
    const selectMulter = useRef(null)
    const [nameDisableOption, setNameDisableOption] = useState(defaultText)

    const chooseOptions = useRef([])

    const changeOption = ({target}) => {
        const op = target.options[target.selectedIndex]

        if (chooseOptions.current.includes(op.value)) {
            chooseOptions.current = chooseOptions.current.filter(e => e !== op.value)
            op.classList.remove(activeOptionClassName)
        } else {
            chooseOptions.current.push(op.value)
            op.classList.add(activeOptionClassName)
        }

        target.selectedIndex = 0
        setNewName()

    }

    const setNewName = () => {
        const name = []
        for (const argument of selectMulter.current) {
            if (chooseOptions.current.includes(argument.value)) {
                name.push(argument.text)

            }
        }
        setNameDisableOption(name.length ? name.join(', ') : defaultText)
    }

    return (
        <div>

            <select ref={selectMulter} defaultValue={defaultValue} value={defaultValue}
                    className={customClassName} onChange={changeOption}>
                <option value={defaultValue} disabled={true}>{nameDisableOption}</option>
                {options?.map((e, index) =>
                    <option value={e.value} className={optionClass}
                            key={index}>{e.text}</option>) ?? <></>}

            </select>
            <select hidden={true} name={name} multiple={true}>
                {chooseOptions.current?.map((v, index) =>
                    <option value={v}
                            key={index} selected={true}></option>) ?? <></>}
            </select>
        </div>
    )
}

export default SelectMulter