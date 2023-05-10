import {body} from "express-validator";
import {LocalDatePlusDays} from "../tools/tools.js";

class EditOrderFormValid {
    static handle() {
        return valid
    }

    static toForm(body) {
        return {
            id: body.id,
            cost: body.cost,
            endDate: body.endDate,
            status: body.status
        }
    }
}

const valid = [
    body('id')
        .exists()
        .withMessage('Must be exists')
        .isHexadecimal()
        .withMessage('Must be hexDecimal')
        .isLength({min: 24, max: 24})
        .withMessage('Length must be 24'),
    body('cost')
        .isInt({min: 100, max: 1000000})
        .withMessage('Cost is not number or not between 100 and 1000000')
        .exists()
        .withMessage('Must be exists'),
    body('endDate')
        .exists()
        .withMessage('Must be exists'),
    body('status')
        .isIn(['CANCELLED', 'DONE', 'PROCESSING', 'UNDER_DEVELOPMENT', 'AWAITING_PRICE_CONFIRMATION', 'EXECUTED', 'SENT'])
        .withMessage('Status is not exists for orders')
        .exists()
        .withMessage('Must be exists')
]

export default EditOrderFormValid