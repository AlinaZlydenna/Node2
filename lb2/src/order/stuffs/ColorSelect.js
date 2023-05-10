import React from "react"
import SelectHttpData from "../../tools/SelectHttpData";

function ColorSelect({attributesSelect = {}, attributesOptions = {}}) {
    return (
        <SelectHttpData
            attributesSelect={attributesSelect}
            attributesOptions={attributesOptions}
            url={'http://localhost:8100/order/colors'}
            toKey={color => color.id}
            toValue={color => color.id}
            toText={color => color.name}
        />

    )
}

export default ColorSelect