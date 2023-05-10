import {getDateNow, getLocalDateTime} from "./tools";
import OrderStatus from "./enums/OrderStatus";

const endDate = {
    labelText: 'End date',
    from: {
        type: 'date',
        min: '1922-01-01',
        max: getDateNow(),
        name: 'endDate[from]',
        style: {
            fontSize: '18px'
        }
    },
    to: {
        type: 'date',
        name: 'endDate[to]',
        min: '1922-01-01',
        max: getDateNow(),
        style: {
            fontSize: '18px'
        }
    }
}

const price = {
    labelText: 'Price',
    from: {
        type: 'number',
        min: 1,
        max: 1000000,
        name: 'cost[from]',
        style: {
            fontSize: '18px'
        }
    },
    to: {
        type: 'number',
        name: 'cost[to]',
        min: 1,
        max: 1000000,
        style: {
            fontSize: '18px'
        }
    }
}

const dateOfCreation = {
    labelText: 'Date of creation',
    from: {
        type: 'datetime-local',
        min: '1922-01-01',
        max: getLocalDateTime(),
        name: 'dateOfCreation[from]',
        style: {
            fontSize: '18px'
        }
    },
    to: {
        type: 'datetime-local',
        name: 'dateOfCreation[to]',
        min: '1922-01-01',
        max: getLocalDateTime(),
        style: {
            fontSize: '18px'
        }
    }
}

const countOfOrder = {
    labelText: 'Count',
    from: {
        type: 'number',
        min: 1,
        max: 1000000,
        name: 'count[from]',
        style: {
            fontSize: '18px'
        }
    },
    to: {
        type: 'number',
        name: 'count[to]',
        min: 1,
        max: 1000000,
        style: {
            fontSize: '18px'
        }
    }
}

const orderStatus = [
    {
        value: OrderStatus.PROCESSING,
        text: 'Processing'
    },
    {
        value: OrderStatus.AWAITING_PRICE_CONFIRMATION,
        text: 'Awaiting price confirmation'
    },
    {
        value: OrderStatus.UNDER_DEVELOPMENT,
        text: 'Under development'
    },
    {
        value: OrderStatus.EXECUTED,
        text: 'Executed'
    },
    {
        value: OrderStatus.SENT,
        text: 'Sent'
    },
    {
        value: OrderStatus.DONE,
        text: 'Done'
    },
    {
        value: OrderStatus.CANCELLED,
        text: 'Cancelled'
    },
]

const genderCheckBox = {
    labelText: 'Gender',
    inputName: 'male',
    to: {
        value: {

            id: 'genderCheckBoxFromId'
        },
        text: 'Female'
    },
    from: {
        value: {

            id: 'genderCheckBoxToId'
        },
        text: 'Male'
    }
}

const sortColumnsOrder = [
    {
        value: 'DATE_OF_CREATION',
        text: 'Date of creation'
    },
    {
        value: 'COST',
        text: 'Cost'
    },
    {
        value: 'CITY',
        text: 'City'
    },
    {
        value: 'EMAIL',
        text: 'Email'
    },
    {
        value: 'COUNT',
        text: 'Count'
    },
    {
        value: 'COLOR',
        text: 'Color'
    },
    {
        value: 'GENDER',
        text: 'Gender'
    },
    {
        value: 'MATERIAL',
        text: 'Material'
    },
    {
        value: 'COUNTRY',
        text: 'Country'
    },
    {
        value: 'END_DATE',
        text: 'End date'
    },
    {
        value: 'FIRSTNAME',
        text: 'Firstname'
    },
    {
        value: 'ORDER_STATUS',
        text: 'Order status'
    },
    {
        value: 'PHONE_NUMBER',
        text: 'Phone number'
    },
    {
        value: 'DELIVERY_ADDRESS',
        text: 'Delivery address'
    }
]

export {orderStatus, dateOfCreation, price, endDate, countOfOrder, genderCheckBox, sortColumnsOrder}