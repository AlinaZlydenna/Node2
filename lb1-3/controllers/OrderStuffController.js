import {Router} from "express";
import MaterialRepository from "../repository/MaterialRepository.js";
import MaterialFormValid from "../validations/MaterialFormValid.js";
import ErrorHandle from "../validations/ErrorHandle.js";
import ColorRepository from "../repository/ColorRepository.js";
import {authAdminRight, authGetUser} from "../tools/AuthMiddleware.js";
import ColorFormValid from "../validations/ColorFormValid.js";
import {TryCallBack} from "../tools/tools.js";

const orderStuffRouter = Router()

class OrderStuffController {
    static async getMaterials(req, res) {
        res.json(
            await MaterialRepository.findBy(
                req.query
            )
        )
    }

    static async saveMaterials(req, res) {
        res.send(
            await MaterialRepository.save(
                MaterialFormValid.toForm(req.body)
            )
        )
    }

    static async editMaterials(req, res) {
        res.json(
            await MaterialRepository.update(
                MaterialFormValid.toForm(req.body)
            )
        )
    }

    static async deleteMaterials(req, res) {
        res.json(
            await MaterialRepository.delete(
                req.body.id
            )
        )
    }

    static async getColors(req, res) {
        res.json(
            await ColorRepository.findBy(
                req.query
            )
        )
    }

    static async saveColor(req, res) {
        res.send(
            await ColorRepository.save(
                ColorFormValid.toForm(req.body)
            )
        )
    }

    static async editColor(req, res) {
        res.json(
            await ColorRepository.update(
                ColorFormValid.toForm(req.body)
            )
        )
    }

    static async deleteColor(req, res) {
        res.json(
            await ColorRepository.delete(
                req.body.id
            )
        )
    }
}

orderStuffRouter.get('/materials',
    OrderStuffController.getMaterials)

orderStuffRouter.post('/materials',
    authGetUser,
    authAdminRight,
    MaterialFormValid.handle(),
    ErrorHandle.handle,
    TryCallBack(OrderStuffController.saveMaterials))

orderStuffRouter.put('/materials',
    authGetUser,
    authAdminRight,
    MaterialFormValid.handle(),
    ErrorHandle.handle,
    TryCallBack(OrderStuffController.editMaterials))

orderStuffRouter.delete('/materials',
    authGetUser,
    authAdminRight,
    TryCallBack(OrderStuffController.deleteMaterials))

orderStuffRouter.get('/colors',
    OrderStuffController.getColors)

orderStuffRouter.post('/colors',
    authGetUser,
    authAdminRight,
    ColorFormValid.handle(),
    ErrorHandle.handle,
    TryCallBack(OrderStuffController.saveColor))

orderStuffRouter.put('/colors',
    authGetUser,
    authAdminRight,
    ColorFormValid.handle(),
    ErrorHandle.handle,
    TryCallBack(OrderStuffController.editColor))

orderStuffRouter.delete('/colors',
    authGetUser,
    authAdminRight,
    TryCallBack(OrderStuffController.deleteColor))

export {orderStuffRouter}