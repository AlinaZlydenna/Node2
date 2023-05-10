import styles from './order.data.card.list.module.css'
import OrderDataCard from "./OrderDataCard";
import {useWindowSize} from "../../tools/useWindowSize";
import {useEffect, useState} from "react";

const OrderDataCardList = ({orders, open}) => {
    const size = useWindowSize();
    const [styleGrid, setStyleGrid] = useState({grid: "repeat(4, 350px) / repeat(5, 425px)"})

    useEffect(() => {
        const gridColumn = Math.floor((size.width - (open ? 360 : 0)) / 440)
        let gridRow = 1
        if (orders.length) {
            gridRow = Math.round(orders.length / gridColumn)
        }


        setStyleGrid({grid: `repeat(${gridRow}, 350px) / repeat(${gridColumn}, 425px)`})
    }, [size, open, orders.length])


    return (
        <div style={styleGrid} className={styles.orderDataCardListContainer}>
            {orders?.map((o, i) => <OrderDataCard order={o} key={i}/>)}
        </div>
    )
}

export default OrderDataCardList
