import {body} from "express-validator";

class MaterialFormValid {
    static handle() {
        return valid
    }

    static toForm(body) {
        const material = {
            name: body.name,
            cost: body.cost
        }

        if (!body.id) {
            return material
        }

        material.id = body.id
        return material
    }
}

const valid = [
    body('name')
        .exists()
        .withMessage('Must be exist')
        .isLength({min: 2, max: 60})
        .withMessage('Must be between 2 and 60')
        .matches(/^(?!\s*$).+/)
        .withMessage('mustn\'t be Blank'),
    body('cost')
        .exists()
        .withMessage('Must be exist')
        .isInt({
            min: 10,
            max: 100000
        })
        .withMessage('Must be number and value between 10 and 100000')
]

export default MaterialFormValid