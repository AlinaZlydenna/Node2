import {Schema, model} from 'mongoose'
import {LocalDateTime} from "../tools/tools.js";

const userSchema = new Schema({
    phoneNumber: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 15,
        validate: {
            validator: function (v) {
                return /\d{10,15}/.test(v) && !/^\s*$/g.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 60,
        validate: {
            validator: function (v) {
                return !/^\s*$/.test(v);
            },
            message: () => `password is blank`
        },
    },
    email: {
        type: String,
        default: null,
        minlength: 5,
        maxlength: 60
    },
    city: {
        type: String,
        default: null,
        minlength: 2,
        maxlength: 60
    },
    country: {
        type: String,
        default: null,
        minlength: 2,
        maxlength: 60
    },
    firstname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 60
    },
    lastname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 60
    },
    dataOfRegistration: {
        type: String,
        default: LocalDateTime(new Date())
    },
    active: {
        type: Boolean,
        default: true
    },
    male: {
        type: Boolean,
        required: true
    },
    userState: {
        type: String,
        default: "REGISTERED",
        enum: ["REGISTRATION", "REGISTERED"]
    },
    role: {
        type: String,
        default: "CUSTOMER",
        enum: ["CUSTOMER"]
    },
})

export default model('User', userSchema);
