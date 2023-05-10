import styles from './order.card.module.css'
import {Link} from "react-router-dom";
import React from "react";
import {getColorByStatus} from "../../tools/tools";
import {toTittleCase} from "../../tools/stringTools";

const OrderCart = ({order}) => {

    return (
        <div className={styles.shortOrderBox}>
            <div className={styles.stateNumberDateOrderBox}>
                <div className={[styles.colorStateBox, styles[getColorByStatus(order.status)]].join(' ')}
                ></div>
                <div className={styles.numberDateOrderBox}>
                    <p>№ {order.id} </p>
                    <p>Date of creation {order.dateOfCreation.replaceAll('T', ' ')} </p>
                    <p>{toTittleCase(order.status.replaceAll('_', ' '))}</p>
                </div>
            </div>

            <div className={styles.paymentStateAndPriceBoxes}>
                <span>End date</span>
                <p>{order.endDate}</p>
            </div>

            <div className={styles.paymentStateAndPriceBoxes}>
                <span>Order price</span>
                <p>{order.cost} UAH</p>
            </div>

            <div className={styles.imgAndMoreDetailsBox}>
                <img src={'http://localhost:8100/' + order.images[0].filename} alt="order image"/>
                <Link to={'../order/show/' + order.id} replace={true}> > </Link>
            </div>
        </div>

    )
}

export default OrderCart