import {Schema, model} from 'mongoose'

const colorSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 60,
        index: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        index: true,
        match: /[0-9A-Fa-f]{6}/,
        maxLength: 6,
        unique: true
    }
})

export default model("Color", colorSchema)