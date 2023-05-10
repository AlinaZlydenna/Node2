import {Router} from "express";
import RegistrationUserValid from "../validations/RegistrationUserValid.js";
import SecurityService from "../services/SecurityService.js";
import LoginFormValid from "../validations/LoginFormValid.js";
import ErrorHandle from "../validations/ErrorHandle.js";

const authorizationRouter = Router()

class AuthorizationController {

    static async signUp(req, res) {
        res.send(await SecurityService.saveUser(req.body))
        res.end()
    }

    static async signIn(req, res) {
        const authUser = await SecurityService.login(req.body)

        if (!authUser) {
            return res.status(400).json({message: 'Data is not correct or user not found'}).end()
        }
        res.json(authUser).end()
    }
}


authorizationRouter.post('/sign-up',
    RegistrationUserValid.handle,
    ErrorHandle.handle,
    AuthorizationController.signUp)


authorizationRouter.post('/login',
    LoginFormValid.handle,
    ErrorHandle.handle,
    AuthorizationController.signIn)


export default authorizationRouter