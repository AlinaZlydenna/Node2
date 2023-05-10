import {body} from "express-validator";

class OrderFormValid {
    static get handle() {
        return valid
    }
}

const valid = [
    body('countOfOrder')
        .isInt({min: 1, max: 10000})
        .withMessage('Count is not number or not between 1 and 10000')
        .exists()
        .withMessage('Must be exists'),
    body('addressForSend')
        .exists()
        .withMessage('Must be exists')
        .isLength({min: 2, max: 200})
        .withMessage('Delivery address must be between 2 and 200')
        .matches(/^(?!\s*$).+/)
        .withMessage('mustn\'t be Blank'),
    body('orderDescription')
        .exists()
        .withMessage('Must be exists')
        .isLength({max: 2000})
        .withMessage('Order description address must be less than 2000')
        .matches(/^(?!\s*$).+/)
        .withMessage('mustn\'t be Blank'),
    body('materialId')
        .exists()
        .withMessage('Must be exists')
        .isLength({min: 24, max: 24})
        .withMessage('Length must be 24')
        .matches(/^(?!\s*$).+/)
        .withMessage('mustn\'t be Blank')
        .isHexadecimal(),
    body('colorId')
        .exists()
        .withMessage('Must be exists')
        .isLength({min: 24, max: 24})
        .withMessage('Length must be 24')
        .matches(/^(?!\s*$).+/)
        .withMessage('mustn\'t be Blank')
        .isHexadecimal(),
    body('partSizes')
        .exists()
        .withMessage('Must be exists')
        .custom(value => {

            checkPartSize(JSON.parse(value))
            return true
        })
]

function checkPartSize(partSizes) {
    if (partSizes.length < 1 || partSizes.length > 10) {
        throw "Part sizes must be between 1 and 10";
    }

    for (const partSize of partSizes) {
        if (!/^(?!\s*$).+/.test(partSize?.name ?? '')) {
            throw "Part size name mustn't be blank"
        }

        if (checkOneSize(partSize, 'width')) {
            throw "Width less than 1. Name = " + partSize.name
        }

        if (checkOneSize(partSize, 'length')) {
            throw "Length less than 1. Name = " + partSize.name
        }

        if (checkOneSize(partSize, 'volume')) {
            throw "Volume less than 1. Name = " + partSize.name
        }

        if (checkOneSize(partSize, 'height')) {
            throw "Height less than 1. Name = " + partSize.name
        }

        if (!partSize.width
            && !partSize.length
            && !partSize.volume
            && !partSize.height) {
            throw "Size wasn't select. Name = " + partSize.name
        }
    }
}

function checkOneSize(part, nameSize) {
    if (!part) {
        return false
    }

    const lessThanOne = 1 > (Number.parseInt(part[nameSize] ?? 2))
    const isNotBlank = /^(?!\s*$).+/.test('' + part[nameSize])

    return lessThanOne && isNotBlank
}

export default OrderFormValid