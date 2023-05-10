function getDateNow() {
    return new Date().toISOString().split("T")[0]
}

function getLocalDateTime() {
    return new Date().toISOString().replace('T', ' ').replace('Z', '')
}

function getParams(e) {
    let paramObj = {}
    for (const param of e.target) {
        if (param.name && param.value) {
            paramObj[param.name] = param.value
        }
    }
    return paramObj
}

function toGetParametersFromTarget(e) {
    const parameters = []
    for (const param of e.target) {
        if (param.name && param.value) {
            parameters.push(param.name + '=' + param.value)
        }
    }
    return parameters.join('&')
}

function toGetParameters(values) {
    const parameters = []

    for (const param of Object.keys(values)) {
        if (param.name && param.value) {
            parameters.push(param.name + '=' + param.value)
        }
    }
    return parameters.join('&')
}

function getColorByStatus(status) {
    if (status === 'DONE') {
        return 'green'
    }
    if (status === 'CANCELLED') {
        return 'red'
    }
    return 'yellow'
}

function convertStuffs(stuffs) {
    return stuffs.map((s) => {
        return {
            text: s.name,
            value: s.id
        }
    })
}

export {
    getDateNow,
    getLocalDateTime,
    getParams,
    toGetParametersFromTarget,
    toGetParameters,
    getColorByStatus,
    convertStuffs
}