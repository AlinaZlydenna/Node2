import styles from './order.filter.admin.module.css'
import stylesButton from '../../clients.office/orders/order.filter.module.css'
import {countOfOrder, dateOfCreation, endDate, genderCheckBox, orderStatus, price} from "../../tools/toolArray";
import BetweenInput from "../../tools/between.input/BetweenInput";
import SelectMulter from "../../tools/mult.select/SelectMulter";
import BetweenCheckbox from "../../tools/between.checbox/BetweenCheckbox";
import {useContext, useEffect, useState} from "react";
import {fetchColor, fetchMaterial} from "../../tools/fetchTools";
import {convertStuffs} from "../../tools/tools";
import {AuthContext} from "../../authorization/context/AuthContext";

const OrderFilter = () => {
    const [materials, setMaterials] = useState([])
    const [colors, setColors] = useState([])
    const {token} = useContext(AuthContext)

    useEffect(() => {
        fetchMaterial(token())
            .then(ms => setMaterials(convertStuffs(ms)))
        fetchColor(token())
            .then(cs => setColors(convertStuffs(cs)))
    }, [])

    return (
        <div className={styles.filterBox}>
            <label htmlFor="" className={[styles.filterMainLabel, styles.filterItemMargin].join(' ')}>Find by</label>

            <SelectMulter name={'materialIds'} defaultText={'Materials'} options={materials}
                          customClassName={[styles.filterInputBox, styles.filterItemMargin].join(' ')}/>

            <SelectMulter name={'colorIds'} defaultText={'Colors'} options={colors}
                          customClassName={[styles.filterInputBox, styles.filterItemMargin].join(' ')}/>

            <SelectMulter name={'orderStatuses'} defaultText={'Order statuses'} options={orderStatus} defaultValue={''}
                          customClassName={[styles.filterInputBox, styles.filterItemMargin].join(' ')}/>

            <input type="number" name="orderId" placeholder="Order id"
                   className={[styles.filterInputBox, styles.filterItemMargin].join(' ')}/>

            <input type="number" name="userId" placeholder="User id"
                   className={[styles.filterInputBox, styles.filterItemMargin].join(' ')}/>

            <input type="text" name="address" placeholder="Address"
                   className={[styles.filterInputBox, styles.filterItemMargin].join(' ')}/>

            <input type="number" name="phoneNumber" placeholder="Phone number"
                   className={[styles.filterInputBox, styles.filterItemMargin].join(' ')}/>

            <input type="text" name="city" placeholder="City"
                   className={[styles.filterInputBox, styles.filterItemMargin].join(' ')}/>

            <input type="text" name="country" placeholder="Country"
                   className={[styles.filterInputBox, styles.filterItemMargin].join(' ')}/>

            <input type="text" name="firstname" placeholder="Firstname"
                   className={[styles.filterInputBox, styles.filterItemMargin].join(' ')}/>

            <BetweenInput left={price.from} right={price.to} labelText={price.labelText}/>
            <BetweenInput left={countOfOrder.from} right={countOfOrder.to} labelText={countOfOrder.labelText}/>
            <BetweenInput left={endDate.from} right={endDate.to} labelText={endDate.labelText}/>

            <BetweenInput left={dateOfCreation.from} right={dateOfCreation.to} labelText={dateOfCreation.labelText}/>

            <BetweenCheckbox labelText={genderCheckBox.labelText} inputName={genderCheckBox.inputName}
                             right={genderCheckBox.from} left={genderCheckBox.to}/>

            <input type="submit" value="Find" className={stylesButton.submitInput}/>

        </div>
    )
}

export default OrderFilter