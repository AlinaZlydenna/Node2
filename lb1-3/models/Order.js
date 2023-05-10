import {Schema, model} from 'mongoose'

const orderSchema = new Schema({
    material: {
        type: Object,
        required: true,
        ref: 'Material'
    },
    color: {
        type: Object,
        required: true,
        ref: 'Color'
    },
    customerOrder: {
        id: {
            type: Schema.Types.ObjectId,
            required: true
        },
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
        email: {
            type: String,
            minlength: 5,
            maxlength: 60
        },
        city: {
            type: String,
            minlength: 2,
            maxlength: 60
        },
        country: {
            type: String,
            minlength: 2,
            maxlength: 60
        },
        firstname: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 60
        },
        isMale: {
            type: Boolean,
            required: true
        }
    },
    status: {
        type: String,
        required: true,
        enum: ['CANCELLED', 'DONE', 'PROCESSING', 'UNDER_DEVELOPMENT', 'AWAITING_PRICE_CONFIRMATION', 'EXECUTED', 'SENT'],
    },
    addressForSend: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 200,
    },
    orderDescription: {
        type: String,
        maxlength: 2000,
    },
    dateOfCreation: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
        min: 1
    },
    countOfOrder: {
        type: Number,
        required: true,
        min: 1
    },
    images: {
        type: Object
    },
    partSizes: {
        type: Object,
        required: true
    }
})

export default model("Order", orderSchema)