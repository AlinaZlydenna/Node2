import OrderRepository from "../repository/OrderRepository.js";
import {LocalDate, LocalDateTime} from "../tools/tools.js";
import MaterialRepository from "../repository/MaterialRepository.js";
import {Types} from "mongoose";
import ColorRepository from "../repository/ColorRepository.js";

class OrderService {
    static async findBy(search) {
        return OrderRepository.findBy(search)
    }

    static async save(order) {
        const endDate = new Date()
        endDate.setDate(endDate.getDay() + 14)

        const orderSave = {
            status: 'PROCESSING',
            orderDescription: null,
            dateOfCreation: LocalDateTime(new Date()),
            endDate: LocalDate(endDate),
            cost: 2000,
            countOfOrder: 1,
            ...order,
            customerOrder: {
                email: null,
                city: null,
                country: null,
                ...order.customerOrder
            },
            material: await MaterialRepository.findBy({
                ids: [new Types.ObjectId(order.materialId)]
            }).then(ms => ms[0]),
            color: await ColorRepository.findBy({
                ids: [new Types.ObjectId(order.colorId)]
            }).then(cs => cs[0]),
            partSizes: JSON.parse(order.partSizes)
        }

        return OrderRepository.save(orderSave)
    }

    static async update(order) {
        if (order.materialId) {
            order.material = await MaterialRepository.findBy({
                ids: [new Types.ObjectId(order.materialId)]
            }).then(ms => ms[0])
            delete order.materialId
        }

        if (order.colorId) {
            order.color = await ColorRepository.findBy({
                ids: [new Types.ObjectId(order.materialId)]
            }).then(cs => cs[0])
            delete order.colorId
        }

        return OrderRepository.update(order)
    }

    static async delete(orderId) {
        return OrderRepository.delete(orderId)
    }
}

export default OrderService

export const toBuyerOrder = order => {
    return {
        id: order.id,
        dateOfCreation: order.dateOfCreation,
        status: order.status,
        cost: order.cost,
        images: order?.images != null ? order.images[0] : ''
    }
}

export const toCustomerOrder = user => {
    return {
        id: user.id,
        phoneNumber: user.phoneNumber,
        email: user.email,
        city: user.city,
        country: user.country,
        firstname: user.firstname,
        isMale: user.male,
    }
}

export function toOrderList(orders) {
    return {
        orderList: orders
    }
}

export function toSaveOrder(request) {
    return {
        countOfOrder: Number(request.body.countOfOrder),
        addressForSend: request.body.addressForSend,
        orderDescription: request.body.orderDescription,
        materialId: request.body.materialId,
        colorId: request.body.colorId,
        partSizes: request.body.partSizes,
        images: request.files.map(f => {
            return {
                originalName: f.originalname,
                filename: f.filename,
                size: f.size
            }
        }),
        customerOrder: toCustomerOrder(request.user)
    }
}