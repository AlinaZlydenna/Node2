import styles from './order.menu.module.css'
import {getColorByStatus} from "../tools/tools";
import {toTittleCase} from "../tools/stringTools";
import {useContext, useEffect, useState} from "react";
import Modal from "../tools/modal/Modal";
import Measurement from "./Measurement";
import {AuthContext} from "../authorization/context/AuthContext";
import Role from "../tools/enums/Role";
import ManagementModal from "./ManagementModal";
import {fetchOrder} from "../tools/fetchTools";
import OrderStatus from "../tools/enums/OrderStatus";

const OrderMenu = ({order, setOrder}) => {
    const [isOpenMeasurements, setOpenMeasurements] = useState(false)
    const [isOpenManagement, setOpenManagement] = useState(false)
    const [status, setStatus] = useState('Loading')
    const {user, token} = useContext(AuthContext)

    useEffect(() => {
        setStatus(order.status)
    }, [order])

    const showMeasurements = () => {
        setOpenMeasurements(true)
    }

    const showManagement = () => {
        setOpenManagement(true)
    }

    const changeStatus = () => {
        const formData = new FormData()
        formData.append('orderId', order.id)

        fetchOrder('http://localhost:8100/orders/status', token(), 'PUT',
            formData
        ).then(
            result => {
                if (result.ok === undefined) {
                    setOrder({...order, status: result.status})
                }
            }
        )
    }

    return (
        <div className={styles.orderMenuContainer}>
            <p>Menu</p>
            <button type={"button"} className={styles.menuButton + ' ' +
                getColorStyle(status)}>{toTittleCase(status)
                .replaceAll('_', ' ')}</button>
            <button type={"button"} disabled={isFinished(status)} onClick={changeStatus}
                    hidden={user.role === Role.ADMINISTRATION}
                    className={disabledStyle(isFinished(status))}
            >{OrderStatus.AWAITING_PRICE_CONFIRMATION === status ? 'Confirm price' : 'Cancel'}
            </button>
            <button type={"button"} className={styles.menuButton}
                    onClick={showMeasurements}>Measurements
            </button>

            {
                user.role === Role.ADMINISTRATION ?
                    <button type={"button"} onClick={showManagement}
                            className={styles.menuButton}>Change
                    </button>
                    :
                    <button type={"button"} disabled={true}
                            className={disabledStyle(true)}>Pay
                    </button>
            }


            <Modal active={isOpenMeasurements} setActive={setOpenMeasurements}>
                {
                    order.partSizes.map((p, i) =>
                        <Measurement measurement={p} id={i} key={`measurement-${i}`}/>
                    )
                }
            </Modal>

            <ManagementModal isOpenManagement={isOpenManagement} order={order}
                             setOpenManagement={setOpenManagement} setOrder={setOrder}/>
        </div>
    )
}

export default OrderMenu

function disabledStyle(use) {
    if (!use) {
        return styles.menuButton
    }
    return [styles.menuButton, styles.disabled].join(' ')
}

function isFinished(status) {
    return status === OrderStatus.CANCELLED || status === OrderStatus.DONE
}

function getColorStyle(status) {
    return styles[getColorByStatus(status)]
}




