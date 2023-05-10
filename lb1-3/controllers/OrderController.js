import {authAdminRight, authGetUser} from "../tools/AuthMiddleware.js";
import {Router} from "express";
import OrderService, {toBuyerOrder, toOrderList, toSaveOrder} from "../services/OrderService.js";
import BuyerOrderFilter from "../filters/BuyerOrderFilter.js";
import OrderRightFilter from "../filters/OrderRightFilter.js";
import {param} from "express-validator";
import ErrorHandle from "../validations/ErrorHandle.js";
import OrderFormValid from "../validations/OrderFormValid.js";
import EditOrderFormValid from "../validations/EditOrderFormValid.js";

const orderRouter = Router()
const CHANGE_ORDER_STATUS = buildChangeMap();

class OrderController {

    static async getById(req, res) {
        res.json(
            toOrderList(
                await OrderService.findBy(
                    new OrderRightFilter(req.user, req.params['id'])
                )
            )
        )
    }

    static async getOrders(req, res) {
        res.json(
            await OrderService.findBy({
                    ...req.query,
                    ...OrderRightFilter.of(req.user)
                }
            )
        )
    }

    static async saveOrder(req, res) {
        const order = toSaveOrder(req)

        res.send(await OrderService.save(order))
    }

    static async editOrder(req, res) {
        const order = EditOrderFormValid.toForm(req.body)

        res.send(await OrderService.update(order))
    }

    static async editOrderStatus(req, res) {
        const order = await OrderService.findBy(
            new OrderRightFilter(req.user, req.body.orderId)
        ).then(os => os[0])

        if (!order) {
            return res.json({message: 'Order not found'})
        }

        if(await OrderService.update({
            id: req.body.orderId,
            status: getOrDefaultCansel(order.status)
        })){
            return res.send({status: getOrDefaultCansel(order.status)})
        }
        res.send({status: getOrDefaultCansel(order.status)})
    }
}


orderRouter.get('/:id',
    param('id')
        .exists()
        .withMessage('Id must be exists')
        .isLength({min: 24, max: 24})
        .withMessage('Length id must be 24')
        .isHexadecimal()
        .withMessage('Id is not Hexadecimal'),
    ErrorHandle.handle,
    authGetUser,
    OrderController.getById)

orderRouter.get('/', authGetUser,
    OrderController.getOrders)

orderRouter.post('/',
    authGetUser,
    OrderFormValid.handle,
    ErrorHandle.handle,
    OrderController.saveOrder)

orderRouter.put('/',
    authGetUser,
    authAdminRight,
    EditOrderFormValid.handle(),
    ErrorHandle.handle,
    OrderController.editOrder
)

orderRouter.put('/status',
    authGetUser,
    OrderController.editOrderStatus
)

export {orderRouter}


function buildChangeMap(){
    const map = new Map();

    map.set('AWAITING_PRICE_CONFIRMATION','UNDER_DEVELOPMENT');
    map.set('DONE','DONE');
    map.set('CANCELLED','CANCELLED');

    return map;
}

function getOrDefaultCansel(status){
    if(CHANGE_ORDER_STATUS.has(status)){
        return CHANGE_ORDER_STATUS.get(status);
    }
    return 'CANCELLED';
}