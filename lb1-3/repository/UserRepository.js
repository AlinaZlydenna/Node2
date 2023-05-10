import User from '../models/User.js'
import UserFilter from "../filters/UserFilter.js";
import MongoFilter from '../filters/MongoFilter.js'
import {LocalDateTime} from '../tools/tools.js'
import {Types} from "mongoose";
import Page from "../tools/Page.js";


class UserRepository {
    static get #MINUTES_FOR_WORK() {
        return 15
    }

    static async findBy(searchCriteria) {
        const filter = await UserFilter.of(searchCriteria)

        const sortField = searchCriteria?.orderBy ?? "dataOfRegistration"

        const sortObject = {[sortField]: searchCriteria?.direction !== 'DESC' ? 1 : -1};

        const users = await Page.setValue(
            User.find(filter),
            sortObject,
            searchCriteria?.limit,
            searchCriteria?.offset
        )

        const userArray = []

        for (const user of users) {
            userArray.push(toUser(await user))
        }

        return userArray
    }

    static async save(user) {
        const userSchema = new User(user)

        await userSchema.validate()

        const answer = await userSchema.save();

        if (answer.errors) {
            return null
        }
        return answer._id.toHexString();
    }

    static async update(user) {
        const userSchema = new User({
            _id: new Types.ObjectId(user.id),
            ...user
        })

        return (await User.updateOne({_id: userSchema._id}, {"$set": userSchema})).modifiedCount !== 0
    }

    static async isBooked(email, phoneNumber) {
        const date = new Date()
        date.setMinutes(date.getMinutes() - UserRepository.#MINUTES_FOR_WORK)

        const query =
            MongoFilter.and([
                MongoFilter.or([
                    {email: MongoFilter.eq(email ?? '')},
                    {phoneNumber: MongoFilter.eq(phoneNumber)}
                ]),
                MongoFilter.or([
                    {userState: 'REGISTERED'},
                    MongoFilter.and([
                        {userState: 'REGISTRATION'},
                        {dataOfRegistration: MongoFilter.gt(LocalDateTime(date))}
                    ])
                ])
            ])

        return Boolean(await User.findOne(query))
    }
}

function toUser(userSchema) {
    return {
        id: userSchema._id.toHexString(),
        phoneNumber: userSchema.phoneNumber,
        password: userSchema.password,
        email: userSchema.email,
        city: userSchema.city,
        country: userSchema.country,
        firstname: userSchema.firstname,
        lastname: userSchema.lastname,
        dataOfRegistration: userSchema.dataOfRegistration,
        active: userSchema.active,
        male: userSchema.male,
        userState: userSchema.userState,
        role: userSchema.role
    }
}

function toUserList(users) {
    const userList = [];
    for (const user of users) {
        delete user.password
        userList.push(user)
    }
    return {userList}
}

export default UserRepository
