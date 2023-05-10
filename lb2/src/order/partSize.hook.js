import {useCallback, useState} from "react";
import PartSizeOrder from "./stuffs/PartSizeOrder";

const startId = 0
const maxSizePartSizes = 10

function usePartSizeOrder() {
    const [partSizes, setPartSizes] = useState([])
    const [id, setId] = useState(startId)

    const createPart = useCallback(() => {
        if (partSizes.length === maxSizePartSizes) {

            alert('Max size ' + maxSizePartSizes)
            return
        }
        const part = new PartSizeOrder(id)
        partSizes.push(part)
        setId(prevState => ++prevState)
    }, [id, partSizes])

    const removePart = useCallback((id) => {
        setPartSizes(prevPartSizes => prevPartSizes.filter(p => p.id !== id))
    }, [setPartSizes])

    const removeIds = useCallback(() => {
        return partSizes.map(p => removeId(p))
    }, [partSizes])

    const validate = useCallback(() => {
        checkPartSize(partSizes)
    }, [partSizes])

    const changePart = useCallback((id, part) => {
        setPartSizes(prevPartSizes => {
                for (let i = 0, size = prevPartSizes.length; i < size; i++) {
                    if (prevPartSizes[i].id === id) {
                        prevPartSizes[i] = part
                        return [].concat(prevPartSizes)
                    }
                }
                return prevPartSizes
            }
        )
    }, [setPartSizes])


    return {partSizes, createPart, removePart, removeIds, validate, changePart}
}

function removeId(oldPart) {
    let newPart = {...oldPart}
    delete newPart.id
    return newPart
}

function checkPartSize(partSizes) {
    if (partSizes.length < 1 || partSizes.length > 10) {
        throw new Error("Part sizes must be between 1 and 10");
    }

    for (const partSize of partSizes) {
        if (!/^(?!\s*$).+/.test(partSize?.name ?? '')) {
            throw new Error("Part size name mustn't be blank")
        }

        if (checkOneSize(partSize, 'width')) {
            throw Error("Width less than 1. Name = " + partSize.name)
        }

        if (checkOneSize(partSize, 'length')) {
            throw Error("Length less than 1. Name = " + partSize.name)
        }

        if (checkOneSize(partSize, 'volume')) {
            throw Error("Volume less than 1. Name = " + partSize.name)
        }

        if (checkOneSize(partSize, 'height')) {
            throw Error("Height less than 1. Name = " + partSize.name)
        }

        if (!partSize.width
            && !partSize.length
            && !partSize.volume
            && !partSize.height) {
            throw Error("Size wasn't select. Name = " + partSize.name)
        }
    }
}

function checkOneSize(part, nameSize) {
    if (!part) {
        return false
    }

    const lessThanOne = 1 > (Number.parseInt(part[nameSize] ?? 2))
    const isNotBlank = /^(?!\s*$).+/.test('' + part[nameSize])

    return lessThanOne && isNotBlank
}

export {usePartSizeOrder}