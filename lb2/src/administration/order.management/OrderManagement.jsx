import styles from './order.management.module.css'
import TopLabel from "../../tools/TopLabel";
import OrderFilter from "./OrderFilter";
import OrderDataCardList from "./OrderDataCardList";
import {useContext, useEffect, useRef, useState} from "react";
import SortMenu from "../../tools/sort.menu/SortMenu";
import {fetchOrder} from "../../tools/fetchTools";
import {AuthContext} from "../../authorization/context/AuthContext";
import {sortColumnsOrder} from "../../tools/toolArray";

const styleShowMenu = {
    gridTemplateColumns: "370px auto"
}

const styleHideMenu = {
    gridTemplateColumns: "40px auto"
}

const OrderManagement = () => {
    const [isOpenMenu, setOpenMenu] = useState(true)
    const openButton = useRef(null)
    const menuItems = useRef(null)
    const [gridContent, setGridContent] = useState(styleShowMenu)
    const [orders, setOrders] = useState([])
    const {token} = useContext(AuthContext)

    const showMenu = () => {
        openButton.current.replaceWith(menuItems.current)
        setGridContent(styleShowMenu)
        setOpenMenu(true)
    }

    const hideMenu = () => {
        if (openButton.current.hidden) {
            openButton.current.hidden = false
        }
        menuItems.current.replaceWith(openButton.current)
        setGridContent(styleHideMenu)
        setOpenMenu(false)
    }

    useEffect(() => {
        fetchOrder('http://localhost:8100/orders?', token())
            .then(os => {
                if (os.ok === undefined) {
                    setOrders(os)
                }
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        fetchOrder('http://localhost:8100/orders?' + getParams(e), token())
            .then(os => {
                if (os.ok === undefined) {
                    setOrders(os)
                }
            })
    }

    return (
        <div className={styles.orderManagementContainer}>
            <TopLabel/>
            <div className={styles.orderManagementContentContainer} style={gridContent}>
                <button ref={openButton} hidden={true} onClick={showMenu} className={styles.openMenu}>◌⃗</button>
                <form ref={menuItems} className={styles.orderManagementMenuContainer} onSubmit={handleSubmit}>
                    <div className={styles.menuHideContainer}>
                        <button onClick={hideMenu}>Hide</button>
                        <p>Count {orders.length}</p>
                    </div>
                    <SortMenu width={353} options={sortColumnsOrder}/>
                    <OrderFilter/>
                </form>
                <OrderDataCardList open={isOpenMenu} orders={orders}/>
            </div>
        </div>
    )
}

export default OrderManagement

const skipParameters = ['orderStatuses', 'materialIds', 'colorIds']

function getParams(e) {
    const parameters = []
    for (const param of e.target) {

        if (param.name && param.value && !skipParameters.includes(param.name)) {
            parameters.push(param.name.replace('[to]', '.to').replace('[from]', '.from') + '=' + param.value)
        }
    }

    for (const skipParameter of skipParameters) {
        if (!e.target[skipParameter]) {
            continue
        }
        for (const param of e.target[skipParameter]) {
            parameters.push(`${skipParameter}=${param.value}`)
        }

    }
    return parameters.join('&')
}

