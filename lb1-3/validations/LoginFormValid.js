import {body} from "express-validator";

class LoginFormValid {
    static get handle() {
        return valid
    }
}

const valid = [
    body('phoneNumber')
        .exists()
        .withMessage('Must be exists')
        .matches(/\d{10,15}/)
        .withMessage('Must has only numbers and length between 10 and 15'),
    body('password')
        .exists()
        .withMessage('Must be exists')
        .isLength({min: 8, max: 60})
        .withMessage('Password must be between 8 and 60')
        .notEmpty()
        .withMessage('Password mustn\'t be empty')
]

export default LoginFormValid