import jwt from "jsonwebtoken";
import config from "config";
import RedisUserService from "../services/RedisUserService.js";

const jwtWord = config.get('jwtWord')

export const authGetUser = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return res.status(401).json({message: "Not authorization"}).end()
        }

        const decoded = jwt.verify(token, jwtWord)

        req.user = await RedisUserService.getUserById(decoded.userId);

        next()
    } catch (e) {
        return res.status(500).json({message: "Server error: " + e.message}).end()
    }
}

export const authAdminRight = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {

        if (req.user.role !== 'ADMINISTRATION') {
            return res.status(401).json({message: "You don\'t have right"}).end()
        }

    } catch (e) {
        return res.status(500).json({message: "Server error"}).end()
    }
    next()
}