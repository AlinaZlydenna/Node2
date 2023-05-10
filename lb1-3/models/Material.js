import {Schema, model} from 'mongoose'

const materialSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 60,
        index: true,
        unique: true
    },
    cost: {
        type: Number,
        required: true,
        min: 1,
    }
})

export default model("Material", materialSchema)