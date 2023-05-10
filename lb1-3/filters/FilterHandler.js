class FilterHandler {
    static isNotEmptyOrWhitespace(str) {
        if (!str) {
            return false
        }
        if (!(typeof str === "string")) {
            return false
        }
        if (str.length === 0) {
            return false
        }
        return (!(/^\s*$/.test(str)));
    }

    static setArrayIfNotNull(search, fieldName) {
        if (!search || !search[fieldName]) {
            return
        }
        search[fieldName] = FilterHandler.toArrayIfOneElement(search[fieldName])
    }

    static isNotEmptyArray(array) {
        if (!array) {
            return false
        }
        if (!(array instanceof Array)) {
            return false
        }
        return array.length !== 0;
    }

    static toArrayIfOneElement(value) {
        if (value instanceof Array) {
            return value
        }
        return [value]
    }
}

export default FilterHandler