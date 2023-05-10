import styles from './order.show.module.css'
import TopLabel from "../tools/TopLabel";
import OrderMenu from "./OrderMenu";
import OrderData from "./OrderData";
import OrderImagesShow from "./OrderImagesShow";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {fetchOrder} from "../tools/fetchTools";
import {AuthContext} from "../authorization/context/AuthContext";

const OrderShow = () => {
    const {id} = useParams();
    const {token} = useContext(AuthContext)
    const [order, setOrder] = useState(null)

    useEffect(() => {
        const url = new URL('http://localhost:8100/orders')
        url.searchParams.append('orderIds', id)
        fetchOrder(url.toString(), token(), 'GET')
            .then(os => setOrder(os[0]))
    }, [])


    return (
        <>
            {
                !order ?
                    <p>Loading</p>
                    :
                    <div className={styles.orderShowContainer}>
                        <TopLabel/>
                        <div className={styles.orderShowContentContainer}>
                            <OrderMenu order={order} setOrder={setOrder}/>
                            <OrderData order={order}/>
                            <OrderImagesShow images={order.images}/>
                        </div>
                    </div>
            }
        </>
    )
}

export default OrderShow