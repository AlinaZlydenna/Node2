import styles from './order.card.list.module.css'
import OrderCart from "./OrderCart";

const OrderCartList = ({orders = []}) => {
    return (
        <div className={styles.shortOrdersContainer}>
            {
                orders.map(o => <OrderCart order={o} key={o.id}/>)
            }
        </div>
    )
}

export default OrderCartList