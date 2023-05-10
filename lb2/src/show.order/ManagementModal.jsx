import styles from './management.modal.module.css'
import {useContext, useState} from "react";
import Role from "../tools/enums/Role";
import Modal from "../tools/modal/Modal";
import {orderStatus} from "../tools/toolArray";
import {getDateNow} from "../tools/tools";
import {AuthContext} from "../authorization/context/AuthContext";
import {fetchOrder} from "../tools/fetchTools";


const ManagementModal = ({isOpenManagement, setOpenManagement, order, setOrder}) => {
    const [price, setPrice] = useState(() => Number(order.cost))
    const [endDate, setEndDate] = useState('' + order.endDate)
    const [status, setStatus] = useState('' + order.status)
    const {user, token} = useContext(AuthContext)

    if (user?.role !== Role.ADMINISTRATION) {
        return <></>
    }

    const changePrice = ({target}) => {
        const newPrice = Number(target.value)
        if (newPrice < 1 || newPrice > 900000000) {
            setPrice(1)
        } else {
            setPrice(newPrice)
        }
    }

    const changeEndDate = ({target}) => {
        setEndDate(target.value)
    }

    const changeStatus = ({target}) => {
        setStatus(target.value)
    }

    const updateOrder = () => {
        const formData = new FormData();
        formData.append('id', order.id)
        formData.append('cost', price.toString())
        formData.append('endDate', endDate.toString())
        formData.append('status', status)


        fetchOrder('http://localhost:8100/orders', token(), 'PUT', formData)
            .then(o => {
                if (o.ok === undefined) {
                    setOrder({...order, status, cost: price, endDate})
                }
            })
    }

    return <Modal active={isOpenManagement} setActive={setOpenManagement}>
        <div className={styles.container}>
            <input type={"number"} placeholder={'Price'} value={price} onChange={changePrice}/>
            <input type={"date"} placeholder={'endDate'} value={endDate} min={getDateNow()} onChange={changeEndDate}/>
            <select name={'status'} onChange={changeStatus}>
                {
                    orderStatus.map((s, i) =>
                        <option value={s.value} key={`status-op-${i}`} selected={s.value === status}>{s.text}</option>)
                }
            </select>
            <button onClick={updateOrder}>Change</button>
        </div>
    </Modal>
}

export default ManagementModal