import {validationResult} from "express-validator";

class ErrorHandle {
    static handle(request, respond, next) {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return respond.status(400).json({errors: errors.array()});
        }
        next()
    }
}

export default ErrorHandle