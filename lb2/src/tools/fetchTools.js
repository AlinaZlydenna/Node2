import clothe from "../show.order/order_img_null_customer_8_1665505081821_turquoise-cute-shirt-edit.jpg";

const orderUrl = 'http://localhost:8100/orders?'

async function fetchOrder(url, token, method = 'GET', body = undefined) {
    return defaultFetch(url, token, method, "", body)
}

async function fetchMaterial(token = undefined, method = 'GET', body = undefined) {
    return await defaultFetch('http://localhost:8100/order/materials', token)
}

async function fetchColor(token = undefined, method = 'GET', body = undefined) {
    return await defaultFetch('http://localhost:8100/order/colors', token)
}

async function defaultFetch(url, token, method, parameters, body) {

    const respond = await fetch(url + (parameters ?? ''), {
        headers: {
            'Authorization': 'Bearer ' + (token ?? ''),

        },
        method,
        body
    });

    if (!respond.ok) {
        return {
            ok: respond.ok,
            status: respond.status,
            text: await respond.text()
        }
    }

    return await respond.json()
}


export {defaultFetch, fetchOrder, fetchMaterial, fetchColor}

const part = {
    name: 'Name',
    width: 1,
    volume: 2,
    height: 3,
    length: 4
}

const order = {
    id: 12,
    material: {
        name: 'Silk'
    },
    color: {
        name: 'Yellow',
        code: '#FFFF00'
    },
    status: "SENT",
    deliveryAddress: 'Pushkina Ave, 77А, Dnipro, Dnipropetrovsk Oblast, 49006',
    cost: 1000,
    countOfOrder: 2,
    dateOfCreation: '2022-12-31T19:25:11.00',
    endDate: '2023-01-26',
    images: [
        {
            'fileName': clothe,
            'size': 12,
            'originalName': 'Mens T Shirt ',
        },
        {
            'fileName': clothe,
            'size': 12,
            'originalName': 'Mens Short Sleeve Cotton Contrast Sleeve Baseball Tee T-Shirt Tshirt No Logo',
        },
        {
            'fileName': clothe,
            'size': 12,
            'originalName': 'Mens Short Sleeve Cotton Contrast Sleeve Baseball Tee T-Shirt Tshirt No Logo',
        },
        {
            'fileName': clothe,
            'size': 12,
            'originalName': 'Mens T Shirt ',
        },
        {
            'fileName': clothe,
            'size': 12,
            'originalName': 'Mens Short Sleeve Cotton Contrast Sleeve Baseball Tee T-Shirt Tshirt No Logo',
        },
        {
            'fileName': clothe,
            'size': 12,
            'originalName': 'Mens Short Sleeve Cotton Contrast Sleeve Baseball Tee T-Shirt Tshirt No Logo',
        },
        {
            'fileName': clothe,
            'size': 12,
            'originalName': 'Mens T Shirt ',
        },
        {
            'fileName': clothe,
            'size': 12,
            'originalName': 'Mens Short Sleeve Cotton Contrast Sleeve Baseball Tee T-Shirt Tshirt No Logo',
        },
        {
            'fileName': clothe,
            'size': 12,
            'originalName': 'Mens Short Sleeve Cotton Contrast Sleeve Baseball Tee T-Shirt Tshirt No Logo',
        }
    ],
    partSizes: [
        {...part, length: (Math.floor(Math.random() * 100) % 100)},
        part, part, part, part, {...part, width: null}
    ],
    clientOrder: {
        firstname: 'Vlad',
        phoneNumber: '380990273345',
        isMale: true,
        country: 'Ukraine',
        city: 'Dnipro'
    }

}