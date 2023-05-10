import SelectMulter from "../../tools/mult.select/SelectMulter";
import styles from './order.filter.module.css'
import BetweenInput from "../../tools/between.input/BetweenInput";
import {getDateNow, getLocalDateTime} from "../../tools/tools";
import {dateOfCreation, endDate, orderStatus, price} from "../../tools/toolArray";


const OrderFilter = () => {
    return (
        <div className={styles.filterBox}>
            <label htmlFor="to-find-filter-button-id" className={styles.filterMainLabel}>Find by</label>

            <SelectMulter customClassName={[styles.filterInputBox, styles.filterItemMargin].join(' ')}
                          options={orderStatus} activeOptionClassName={styles.optionActive} defaultText={'Status'}
                          name={'orderStatuses'}/>

            <BetweenInput left={price.from} right={price.to} labelText={price.labelText}/>

            <BetweenInput left={endDate.from} right={endDate.to} labelText={endDate.labelText}/>

            <BetweenInput left={dateOfCreation.from} right={dateOfCreation.to} labelText={dateOfCreation.labelText}/>

            <input type="submit" value="Find" id={'to-find-filter-button-id'}
                   className={styles.submitInput}
            />
        </div>
    )
}

export default OrderFilter