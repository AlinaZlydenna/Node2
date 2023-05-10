import {body} from "express-validator";

class ColorFormValid {
    static handle() {
        return valid
    }

    static toForm(body) {
        const color = {
            name: body.name,
            code: body.code
        }

        if (!body.id) {
            return color
        }

        color.id = body.id
        return color
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
    body('code')
        .exists()
        .withMessage('Must be exist')
        .isLength({min: 6, max: 8})
        .withMessage('Length must be between 6 and 8')
        .isHexColor()
        .withMessage('Must be hex color')
]

export default ColorFormValid