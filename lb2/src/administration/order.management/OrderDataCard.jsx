import styles from './order.data.card.module.css'
import {Link} from "react-router-dom";
import {useRef, useState} from "react";

const informationStyle = {
    color: "#520974"
}

const openSize = {
    gridRow: " span 2",
    maxHeight: '710px'
}

const closeSize = {
    gridRow: " span 1",
    maxHeight: '350px'
}

const OrderDataCard = ({order}) => {
    const detailsData = useRef()
    const [detailsStyle, setDetailsStyle] = useState(closeSize)
    const handleToggle = () => {
        if (detailsData.current.open) {
            setDetailsStyle(openSize)
        } else {
            setDetailsStyle(closeSize)
        }
    }

    return (
        <div className={styles.orderBox} style={detailsStyle}>
            <h2>Number: {order.id}</h2>
            <p>Address for send : <samp style={informationStyle}>{order.addressForSend}</samp></p>
            <p>Date of creation : <samp style={informationStyle}>{order.dateOfCreation.replace('T', ' ')}</samp></p>
            <p>End date : <samp style={informationStyle}>{order.endDate}</samp></p>
            <p>Price : <samp style={informationStyle}>{order.cost} UAH</samp></p>
            <details ref={detailsData} className={styles.orderDetails} onToggle={handleToggle}>
                <summary>Order details</summary>
                <p>Material : <samp style={informationStyle}>{order.material.name}</samp></p>
                <p>Color : <samp style={informationStyle}>{order.color.name}</samp></p>
                <p>State : <samp style={informationStyle}>{order.status}</samp></p>
                <p>Count : <samp style={informationStyle}>{order.countOfOrder}</samp></p>
                <p>Images count : <samp style={informationStyle}>{order.images.length}</samp></p>
                <p>Past size count : <samp style={informationStyle}>{order.partSizes.length}</samp></p>
                <p>Customer firstname : <samp style={informationStyle}>{order.customerOrder.firstname}</samp></p>
                <p>Customer phone number : <samp style={informationStyle}>{order.customerOrder.phoneNumber}</samp></p>
                <p>Gender : <samp style={informationStyle}>{order.customerOrder.male ? 'Male' : 'Female'}</samp></p>
                <p>Customer country : <samp style={informationStyle}>{order.customerOrder.country}</samp></p>
                <p>Customer city : <samp style={informationStyle}>{order.customerOrder.city}</samp></p>
            </details>

            <div className={styles.linkButtonBox}>
                <Link to={'../order/show/' + order.id} replace={true}>
                    <button type="button" className={styles.linkButton}>Open</button>
                </Link>
            </div>
        </div>
    )
}

export default OrderDataCard