function toTittleCase(str) {
    if (!(str?.length && str.length != 1 && typeof str === "string")) {
        return ''
    }
    return str.at(0).toUpperCase() + str.substring(1).toLowerCase()
}

export {toTittleCase}