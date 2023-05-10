import Order from "../models/Order.js";
import {Types} from "mongoose";
import OrderFilter from "../filters/OrderFilter.js";
import Page from "../tools/Page.js";
import {toArray} from "../tools/tools.js";
import {toColor, toColorSchema} from "./ColorRepository.js";
import {toMaterial} from "./MaterialRepository.js";

class OrderRepository {
    static async findBy(search) {
        const filter = new OrderFilter(search)

        const sortField = search?.sortColumn ?? "dateOfCreation"

        const sortObject = {[sortField]: search?.direction === 'ASC' ? 1 : -1}

        const ordersQuery = await Page.setValue(
            Order.find(filter),
            sortObject,
            search?.limit,
            search?.offset
        )

        return toArray(ordersQuery, toOrder)
    }

    static async save(order) {
        const orderSchema = toOrderSchema({
            ...order,
            id: new Types.ObjectId().toHexString()
        })

        await orderSchema.validate()

        return !(await orderSchema.save()).errors
    }

    static async update(order) {
        const orderSchema = toOrderSchema(order)

        return (await Order.updateOne({_id: orderSchema._id},
            {"$set": orderSchema}
        )).modifiedCount !== 0
    }

    static async delete(orderId) {
        return (await Order.deleteOne({_id: Types.ObjectId(orderId)})).deletedCount === 1
    }
}


function toOrder(oldOrder) {
    return {
        id: oldOrder._id.toHexString(),
        material: toMaterial(oldOrder.material),
        color: toColor(oldOrder.color),
        customerOrder: oldOrder.customerOrder,
        status: oldOrder.status,
        addressForSend: oldOrder.addressForSend,
        orderDescription: oldOrder.orderDescription,
        dateOfCreation: oldOrder.dateOfCreation,
        endDate: oldOrder.endDate,
        cost: oldOrder.cost,
        countOfOrder: oldOrder.countOfOrder,
        images: oldOrder.images,
        partSizes: oldOrder.partSizes
    }
}

export function toOrderSchema(order) {
    let orderSchema = new Order({
        _id: new Types.ObjectId(order.id),
        ...order,
    })

    if (order.color) {
        orderSchema['color'] = toColorSchema(order.color)._doc
    }

    if (order.material) {
        orderSchema['material'] = toColorSchema(order.material)._doc
    }

    return orderSchema
}

export default OrderRepository