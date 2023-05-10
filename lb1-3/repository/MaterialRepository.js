import Material from "../models/Material.js";
import {Types} from "mongoose";
import MaterialFilter from "../filters/MaterianFilter.js";
import {toArray} from "../tools/tools.js";
import Page from "../tools/Page.js";

class MaterialRepository {
    static async findBy(search) {
        const filter = new MaterialFilter(search)

        const sortField = search?.orderBy ?? "name"

        const sortObject = {[sortField]: search?.direction === 'DESC' ? 1 : -1}

        const materials = await Page.setValue(
            Material.find(filter),
            sortObject,
            search?.limit,
            search?.offset
        )

        return toArray(materials, toMaterial)
    }

    static async save(material) {
        const materialSchema = new Material(material)

        await materialSchema.validate()

        return !(await materialSchema.save()).errors
    }

    static async update(material) {
        const materialSchema = toMaterialSchema(material)

        await materialSchema.validate()

        return (await Material.updateOne({_id: materialSchema._id},
            {"$set": materialSchema}
        )).modifiedCount !== 0
    }

    static async delete(materialId) {
        return (await Material.deleteOne({_id: Types.ObjectId(materialId)})).deletedCount === 1
    }
}

export function toMaterial(oldMat) {
    return {
        id: oldMat._id.toHexString(),
        name: oldMat.name,
        cost: oldMat.cost
    }
}

export function toMaterialSchema(material) {
    return new Material({
        _id: new Types.ObjectId(material.id),
        ...material
    })
}

export default MaterialRepository






