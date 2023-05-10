import React, {useEffect, useState} from "react";

const notFound = <option>Not found</option>

function SelectHttpData({attributesSelect = {}, attributesOptions = {}, url, toKey, toValue, toText}) {
    const [values, setValues] = useState(<option>Loading ...</option>)

    useEffect(() => {
        const fetchValues = async () => {
            try {
                const respond = await fetch(url)

                if (!respond.ok) {
                    setValues(notFound)
                }

                setValues(<>{
                    (await respond.json()).map(value => <option
                        key={toKey(value)}
                        value={toValue(value)}
                        {...attributesOptions}
                    >{toText(value)}</option>)
                }</>)
            } catch (e) {
                setValues(notFound)
            }
        }

        fetchValues()
    }, [])

    return (
        <select {...attributesSelect}>
            {values}
        </select>
    )
}

export default SelectHttpData