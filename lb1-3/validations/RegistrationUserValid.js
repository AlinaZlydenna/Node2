import {body} from "express-validator";

class RegistrationUserValid {
    static get handle() {
        return valid
    }
}

const valid = [
    body('phoneNumber')
        .exists()
        .withMessage('must be input')
        .isString()
        .notEmpty()
        .withMessage('mustn\'t be Empty')
        .isLength({min: 10, max: 15})
        .withMessage('must be between 10 and 15')
        .matches(/\d{10,15}/)
        .withMessage('must contain only numbers'),
    body('password')
        .exists()
        .withMessage('must be input')
        .isString()
        .notEmpty()
        .withMessage('mustn\'t be Empty')
        .isLength({min: 8, max: 60})
        .matches(/^(?!\s*$).+/)
        .withMessage('mustn\'t be Blank'),
    body('email')
        .optional({nullable: true, checkFalsy: true})
        .isEmail()
        .withMessage('Email has mistake')
        .isLength({min: 5, max: 60}),
    body('city')
        .optional({nullable: true, checkFalsy: true})
        .isString()
        .isLength({max: 60})
        .withMessage('must be less than 60'),
    body('country')
        .optional({nullable: true, checkFalsy: true})
        .isString()
        .withMessage('country is not string')
        .isLength({max: 60})
        .withMessage('must be less than 60'),
    body('firstname')
        .exists()
        .withMessage('must be input')
        .isString()
        .notEmpty()
        .withMessage('mustn\'t be Empty')
        .isLength({min: 2, max: 60})
        .withMessage('must be between 2 and 60')
        .matches(/^(?!\s*$).+/)
        .withMessage('mustn\'t be Blank'),
    body('lastname')
        .exists()
        .withMessage('must be input')
        .isString()
        .notEmpty()
        .withMessage('mustn\'t be Empty')
        .isLength({min: 2, max: 60})
        .withMessage('must be between 2 and 60')
        .matches(/^(?!\s*$).+/)
        .withMessage('mustn\'t be Blank'),
    body('male')
        .exists()
        .isBoolean()
]


export default RegistrationUserValid