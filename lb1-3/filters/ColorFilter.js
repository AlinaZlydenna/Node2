import MongoFilter from "./MongoFilter.js";
import FilterHandler from "./FilterHandler.js";

class ColorFilter {
    constructor(search) {
        let filter = {}

        if (FilterHandler.isNotEmptyArray(search?.ids)) {
            filter._id = MongoFilter.in(search?.ids)
        }

        if (FilterHandler.isNotEmptyOrWhitespace(search?.name)) {
            filter.name = MongoFilter.containing(search.name)
        }

        if (FilterHandler.isNotEmptyOrWhitespace(search?.code)) {
            filter.code = MongoFilter.eq(search.code)
        }

        return filter
    }
}

export default ColorFilter