import FilterHandler from "./FilterHandler.js";
import MongoFilter from "./MongoFilter.js";

class MaterialFilter {
    constructor(search) {
        let filter = {}

        if (FilterHandler.isNotEmptyArray(search?.ids)) {
            filter._id = MongoFilter.in(search?.ids)
        }

        if (FilterHandler.isNotEmptyOrWhitespace(search?.name)) {
            filter.name = MongoFilter.containing(search.name)
        }

        if (FilterHandler.isNotEmptyArray(search?.costs)) {
            filter.cost = MongoFilter.in(search.costs)
        }

        return filter
    }
}

export default MaterialFilter