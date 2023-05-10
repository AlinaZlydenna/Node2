import ColorFilter from "../filters/ColorFilter.js";
import Page from "../tools/Page.js";
import Color from "../models/Color.js";
import {toArray} from "../tools/tools.js";
import {Types} from "mongoose";

class ColorRepository {
    static async findBy(search) {
        const filter = new ColorFilter(search)

        const sortField = search?.orderBy ?? "name"

        const sortObject = {[sortField]: search?.direction === 'DESC' ? 1 : -1}

        const colorsQuery = await Page.setValue(
            Color.find(filter),
            sortObject,
            search?.limit,
            search?.offset
        )

        return toArray(colorsQuery, toColor)
    }

    static async save(color) {
        const colorSchema = new Color(color)

        await colorSchema.validate()

        return !(await colorSchema.save()).errors
    }

    static async update(color) {
        const colorSchema = toColorSchema(color)

        return (await Color.updateOne({_id: colorSchema._id},
            {"$set": colorSchema}
        )).modifiedCount !== 0
    }

    static async delete(colorId) {
        return (await Color.deleteOne({_id: Types.ObjectId(colorId)})).deletedCount === 1
    }
}

export function toColor(oldColor) {
    return {
        id: oldColor._id.toHexString(),
        name: oldColor.name,
        code: oldColor.code
    }
}

export function toColorSchema(color) {
    return new Color({
        _id: new Types.ObjectId(color.id),
        ...color
    })
}

export default ColorRepository