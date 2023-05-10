import React from "react"
import './order_data_line.css'
import ColorSelect from "./stuffs/ColorSelect";
import MaterialSelect from "./stuffs/MaterialSelect";
import Counter from "../tools/Counter";

function OrderDataLine() {
    return (
        <div className={'order-data-line-container'}>
            <div className="input-data-container-text-and-put">
                <label htmlFor="color-id" className="input-data-label">Color</label>
                <ColorSelect attributesSelect={{
                    className: 'input-data-box',
                    name: "colorId",
                    id: "color-id",
                    required: true
                }}/>
            </div>

            <div className="input-data-container-text-and-put">
                <label htmlFor="material-id" className="input-data-label">Material</label>
                <MaterialSelect attributesSelect={{
                    className: 'input-data-box',
                    name: "materialId",
                    id: "material-id",
                    required: true
                }}/>
            </div>

            <div className="input-data-container-text-and-put">
                <label htmlFor="address-for-send-id" className="input-data-label">Delivery address</label>
                <input type="text" name="addressForSend" id="address-for-send-id" className="input-data-box"
                       style={{width: "330px", height: '35px'}} required/>
            </div>

            <div className={'create-order-buttons'}>
                <Counter/>
                <p style={{width: "10px"}}></p>
                <input type="submit" value="Made" className="made-button"/>
            </div>
        </div>
    )
}

export default OrderDataLine