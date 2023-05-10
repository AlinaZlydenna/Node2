import React from "react"
import './measures.css'

function Measures({name, fieldName, id, part, changePart, readOnly = false}) {
    return (
        <div className="part-size-input-box">
            <label htmlFor={id}>{name.toUpperCase().charAt(0) + name.substring(1)} <em>cm</em></label>
            <input type="number" value={part[fieldName]} id={id} min={1} readOnly={readOnly}
                   onChange={(e) => changePart(part.id, {...part, [name]: Number(e.target.value)})}/>
        </div>
    )
}

export default Measures