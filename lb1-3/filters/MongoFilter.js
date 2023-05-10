class MongoFilter {
    static containing(value) {
        if (!(typeof value === "string")) {
            throw "[Filter.containing] value is not String"
        }
        return {"$regex": `.*${value}.*`}
    }

    static eq(value) {
        return {"$eq": value}
    }

    static in(value) {
        return {"$in": value}
    }

    static gt(value) {
        return {"$gt": value}
    }

    static lt(value) {
        return {"$lt": value}
    }

    static and(value) {
        return {"$and": value}
    }

    static or(value) {
        return {"$or": value}
    }

    static hasRange(search, searchFieldName) {
        if(!search){
            return false
        }
        return search[searchFieldName + '.from'] || search[searchFieldName + '.to']
    }

    static toRangeSearch(search, filter, fieldName, searchFieldName = fieldName) {
        let fieldRange = {}

        if (search[searchFieldName + '.from']) {
            fieldRange['$gt'] = search[searchFieldName + '.from']
        }

        if (search[searchFieldName + '.to']) {
            fieldRange['$lt'] = search[searchFieldName + '.to']
        }

        if (Object.keys(fieldRange).length !== 0) {
            filter[fieldName] = fieldRange
        }
    }
}

export default MongoFilter