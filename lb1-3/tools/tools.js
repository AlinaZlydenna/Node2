import multer from "multer";

function LocalDateTime(date) {
    return date.toISOString().replace('Z', '')
}

function getDate(minusMinutes) {
    const date = new Date()
    date.setMinutes(date.getMinutes() - minusMinutes)
    return date
}

function toArray(values, converterFunc = from => from) {
    const valueArray = []

    for (const value of values) {
        valueArray.push(converterFunc(value))
    }

    return valueArray
}

function LocalDate(date) {
    return date.toLocaleDateString('fr-CA')
}

function LocalDatePlusDays(date, days) {
    date.setDate(date.getDay() + days)
    return date.toLocaleDateString('fr-CA')
}

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, file.fieldname + makeid(20) + '-' + Date.now() + '.' + extension)
    }
})

function TryCallBack(callback) {
    return (req, res) => {
        try {
            callback(req, res)
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    }
}

export {LocalDateTime, getDate, toArray, LocalDate, storage, LocalDatePlusDays}
export {TryCallBack}