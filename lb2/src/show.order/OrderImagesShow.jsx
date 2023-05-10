import styles from './order.images.show.module.css'
import {useWindowSize} from "../tools/useWindowSize";
import {useEffect, useState} from "react";


const OrderImagesShow = ({images}) => {
    const size = useWindowSize()
    const [gripTemplate, setGripTemplate] = useState({gridTemplate: "repeat(3,140px) / repeat(4,100px)"})

    useEffect(() => {

        if (images.length) {
            const calColumns = Math.floor((size.width - 610) / 110)
            const columns = calColumns > 5 ? 4 : calColumns
            const absColumns = columns < 1 ? 1 : columns
            const calRows = images.length / absColumns
            const rows = Number.isInteger(calRows) ? Math.floor(calRows) : Math.floor(calRows + 1)
            setGripTemplate({gridTemplate: `repeat(${rows},140px) / repeat(${absColumns},100px)`})
        } else {
            setGripTemplate({gridTemplate: 'repeat(${1},140px) / repeat(${1},100px)'})
        }

    }, [size])

    return (
        <div className={styles.orderImagesContainer} style={gripTemplate}>

            {
                images.map((oImg, i) =>
                    <div key={`order-image-${i}`} className={styles.orderImageBox}>
                        <img src={'http://localhost:8100/' + oImg.filename}/>
                        <label>{oImg.originalName}</label>
                    </div>
                )
            }

        </div>
    )
}

export default OrderImagesShow