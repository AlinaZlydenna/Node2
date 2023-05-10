import React from "react"
import SelectHttpData from "../../tools/SelectHttpData";

function MaterialSelect({attributesSelect = {}, attributesOptions = {}}) {
    return (
        <SelectHttpData
            attributesSelect={attributesSelect}
            attributesOptions={attributesOptions}
            url={'http://localhost:8100/order/materials'}
            toKey={material => material.id}
            toValue={material => material.id}
            toText={material => material.name}
        />

    )
}

export default MaterialSelect