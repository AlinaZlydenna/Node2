import React, {useContext} from "react";
import './create_special_order.css'
import AddPhotos from "./AddPhotos";
import TopLabel from "../tools/TopLabel";
import OrderDataLine from "./OrderDataLine";
import {usePartSizeOrder} from "./partSize.hook";
import CreateOrderPartSize from "./CreateOrderPartSize";
import Basement from "../main/Basement";
import {AuthContext} from "../authorization/context/AuthContext";
import {useNavigate} from "react-router-dom";
import {fetchOrder} from "../tools/fetchTools";
import FormDataUtils from "../tools/FormDataUtils";

function CreateSpecialOrder() {
    const partSizeHook = usePartSizeOrder()
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    return (
        <div className={'create-special-body'}>
            <TopLabel/>
            <form className={'create-special-container'}
                  onSubmit={(e) => createOrder(e, partSizeHook, auth.token(), navigate)}>
                <AddPhotos/>

                <div className={'inputs-container'}>
                    <OrderDataLine/>

                    <div className="wishes-container">
                        <label htmlFor="wishes-order-id" className="wishes-label">Wishes</label>
                        <textarea name="orderDescription" id="wishes-order-id" className="wishes-box"></textarea>
                    </div>

                    <br/>

                    <CreateOrderPartSize {...partSizeHook}/>
                </div>

            </form>
            <br/>
            <Basement/>
        </div>
    )
}

function createOrder(e, {validate, removeIds}, token, navigate) {
    e.preventDefault()

    try {
        validate()

        const formData = new FormData()

        formData.append('partSizes', JSON.stringify(removeIds()))

        for (const param of e.target) {
            if (param.name && param.value) {
                if (param.name === 'images') {
                    for (const file of param.files) {
                        formData.append('images', file, file.name)
                    }

                } else {
                    formData.append(param.name, param.value)
                }
            }
        }

        saveOrder(formData, token)
            .then(res => {
                if (res) {
                    navigate('../order/office', {replace: true})
                }
            })

    } catch (e) {
        alert(e)
    }

}

async function saveOrder(formData, token) {
    const respond = await fetch('http://localhost:8100/orders', {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': 'Bearer ' + token
        },

    })


    if (respond.ok) {
        return (await respond.json()) ?? false
    }

    alert(await respond.text())
    return false
}



export default CreateSpecialOrder