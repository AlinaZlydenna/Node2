import UserRepository from '../repository/UserRepository.js'
import bcrypt from 'bcryptjs'
import config from "config";
import jwt from "jsonwebtoken";

const strength = config.get('strength')
const jwtWord = config.get('jwtWord')
const oneHour =  60 * 60 * 1000;

class SecurityService {
    static get #USER_NOT_FOUND() {
        return false
    }

    static async saveUser(userForm) {
        if (await UserRepository.isBooked(userForm.email, userForm.phoneNumber)) {
            return false;
        }

        const salt = await bcrypt.genSalt(Number.parseInt(strength));

        userForm.password = await bcrypt.hash(userForm.password, salt);

        return !!await UserRepository.save(userForm);
    }

    static async login(signInUser) {
        const user = (await UserRepository.findBy({
            username: signInUser.phoneNumber,
            active: true,
            userStates: ['REGISTERED']
        }))[0]

        if (!user || await SecurityService.#comparePassword(signInUser.password, user.password)) {
            return null
        }

        delete user.password
        delete user.userState
        delete user.active
        delete user.dataOfRegistration

        return {
            token: jwt.sign(
                {userId: user.id, phoneNumber : user.phoneNumber},
                jwtWord,
                {
                    expiresIn: '1h'
                }
            ),
            user,
            endDateToken : Date.now() + oneHour
        }
    }



    static async #comparePassword(inputPass, actualPass) {
        const salt = await bcrypt.genSalt(Number.parseInt(strength));

        const hashInputPass = await bcrypt.hash(inputPass, salt)

        return bcrypt.compare(hashInputPass, actualPass)
    }
}

export default SecurityService