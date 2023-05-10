import styles from './order.office.module.css'
import OrderFilter from "./OrderFilter";
import SortMenu from "../../tools/sort.menu/SortMenu";
import OrderCartList from "./OrderCartList";
import TopLabel from "../../tools/TopLabel";
import {fetchOrder} from "../../tools/fetchTools";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../authorization/context/AuthContext";

const sortOptions = [
    {
        value: 'DATE_OF_CREATION',
        text: 'Date of creation'
    },
    {
        value: 'STATUS',
        text: 'Status'
    },
    {
        value: 'PRICE',
        text: 'Price'
    },
    {
        value: 'END_DATE',
        text: 'End date'
    },

]

const selectOrderStatuses = 'orderStatuses'

const OrderOffice = () => {
    const [orders, setOrders] = useState([])
    const {token} = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        const url = new URL("http://localhost:8100/orders");

        for (const param of e.target) {
            if (param.name && param.value && selectOrderStatuses !== param.name) {
                url.searchParams.append(param.name.replace("[to]", ".to").replace("[from]", ".from"), param.value)
            }
        }

        if (e.target[selectOrderStatuses]) {
            for (const param of e.target[selectOrderStatuses]) {
                url.searchParams.append(selectOrderStatuses, param.value)
            }
        }

        fetchOrder(url, token(), 'GET')
            .then(os => setOrders(os ?? []))

    }

    useEffect(() => {
        fetchOrder("http://localhost:8100/orders", token())
            .then(os => setOrders(os))
    }, [])

    return (
        <div className={styles.orderOfficeContainer}>
            <TopLabel/>
            <div className={styles.orderOfficeDateContainer}>
                <form className={styles.orderOfficeMenuBox} onSubmit={handleSubmit}>
                    <OrderFilter/>
                    <br/>
                    <SortMenu options={sortOptions}/>
                </form>
                <div>
                    <OrderCartList orders={orders}/>
                </div>
            </div>

        </div>
    )
}

export default OrderOffice