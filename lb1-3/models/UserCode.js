import {Schema, model} from 'mongoose'


const userCodeSchema = new Schema({
    value: {
        type: String,
        required: true,
        length: 20
    },
    dateOfCreation: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    userPhoneNumber: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 15
    }
}, {collection: 'userCodes'})

export default model('UserCode', userCodeSchema)