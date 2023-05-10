import styles from './order.data.module.css'
import {useContext} from "react";
import {AuthContext} from "../authorization/context/AuthContext";
import Role from "../tools/enums/Role";

const informationStyle = {
    color: "#520974"
}

const colorBox = {
    width: "10px",
    height: '10px'

}

const OrderData = ({order}) => {
    const {user} = useContext(AuthContext)

    return (
        <div className={styles.orderDataBox}>
            <h2>Order Data</h2>
            <div className={styles.orderDataContainer}>
                <p>Number : <samp style={informationStyle}>{order.id}</samp></p>
                <p>Color : <samp style={informationStyle}>{order.color.name}</samp>
                    <samp style={{...colorBox, color: order.color.code}}> ▉</samp>
                </p>
                <p>Material : <samp style={informationStyle}>{order.material.name}</samp></p>
                <p>Address for send : <samp style={informationStyle}>{order.addressForSend}</samp></p>
                <p>Count : <samp style={informationStyle}>{order.countOfOrder}</samp></p>
                <p>Price : <samp style={informationStyle}>{order.cost} UAH</samp></p>
                <p>Date of creation : <samp style={informationStyle}>{order.dateOfCreation.replace('T', ' ')}</samp></p>
                <p>End date : <samp style={informationStyle}>{order.endDate}</samp></p>

                {getDopContent(order, user)}

                <p>Description : <samp style={informationStyle}>{order.orderDescription}</samp></p>

            </div>
        </div>
    )
}

export default OrderData

function getDopContent(order, user) {
    if (user.role !== Role.ADMINISTRATION) {
        return <></>
    }

    return <>
        <p>Client :</p>
        <p>First name : <samp style={informationStyle}>{order.customerOrder.firstname}</samp></p>
        <p>Phone number : <samp style={informationStyle}>{order.customerOrder.phoneNumber}</samp></p>
        <p>Country : <samp style={informationStyle}>{order.customerOrder.country}</samp></p>
        <p>City : <samp style={informationStyle}>{order.customerOrder.city}</samp></p>
        <p>Gender : <samp style={informationStyle}>{order.customerOrder.male ? 'Male' : 'Female'}</samp></p>
    </>
}