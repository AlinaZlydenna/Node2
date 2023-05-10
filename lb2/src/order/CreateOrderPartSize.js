import React from "react"
import './create_order_part_size.css'
import Measures from "./stuffs/Measures";

function CreateOrderPartSize({partSizes, createPart, removePart, changePart}) {

    return (
        <div className="order-part-size-container">
            {partSizes.map(p => toJsxPartSizeOrder(p, removePart, changePart))}
            <button type="button" className="create-part-size-button" id="add-button-id"
                    onClick={() => createPart()}>Add
            </button>
        </div>
    )
}

function toJsxPartSizeOrder(part, removePart, changePart) {
    const partWidthId = 'part-size-width-' + part.id
    const partLengthId = 'part-size-length-' + part.id
    const partHeightId = 'part-size-height-' + part.id
    const partVolumeId = 'part-size-volume-' + part.id

    return (
        <div className="part-size-box" key={part.id}>
            <div className="name-with-remove-button-box">
                <input type="text" placeholder="Write part size name" value={part.name} required={true} minLength={1}
                       maxLength={60}
                       onChange={(e) => changePart(part.id, {...part, name: e.target.value})}/>
                <button type="button" onClick={() => removePart(part.id)}>-
                </button>
            </div>
            <div className="part-size-input-container">
                <Measures id={partWidthId} name={'width'} part={part} changePart={changePart}/>
                <Measures id={partLengthId} name={'length'} part={part} changePart={changePart}/>
                <Measures id={partHeightId} name={'height'} part={part} changePart={changePart}/>
                <Measures id={partVolumeId} name={'volume'} part={part} changePart={changePart}/>
            </div>
        </div>
    )
}


export default CreateOrderPartSize

