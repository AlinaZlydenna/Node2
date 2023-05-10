import MongoFilter from "./MongoFilter.js";
import FilterHandler from "./FilterHandler.js";
import {Types} from "mongoose";

class OrderFilter {
    constructor(search) {
        let filter = {}

        FilterHandler.setArrayIfNotNull(search, 'orderIds')
        if (FilterHandler.isNotEmptyArray(search?.orderIds)) {
            filter._id = MongoFilter.in(search?.orderIds.map(id => new Types.ObjectId(id)))
        }

        FilterHandler.setArrayIfNotNull(search, 'materialIds')
        if (FilterHandler.isNotEmptyArray(search?.materialIds)) {
            filter['material._id'] = MongoFilter.in(search.materialIds.map(id => new Types.ObjectId(id)))
        }

        FilterHandler.setArrayIfNotNull(search, 'colorIds')
        if (FilterHandler.isNotEmptyArray(search?.colorIds)) {
            filter['color._id'] = MongoFilter.in(search.colorIds.map(id => new Types.ObjectId(id)))
        }

        FilterHandler.setArrayIfNotNull(search, 'userIds')
        if (FilterHandler.isNotEmptyArray(search?.userIds)) {
            filter['customerOrder.id'] = MongoFilter.in(search.userIds.map(id => new Types.ObjectId(id)))
        }

        FilterHandler.setArrayIfNotNull(search, 'orderStatuses')
        if (FilterHandler.isNotEmptyArray(search?.orderStatuses)) {
            filter.status = MongoFilter.in(search.orderStatuses)
        }

        if (FilterHandler.isNotEmptyOrWhitespace(search?.address)) {
            filter.addressForSend = MongoFilter.containing(search.address)
        }

        if (FilterHandler.isNotEmptyOrWhitespace(search?.phoneNumber)) {
            filter['customerOrder.phoneNumber'] = MongoFilter.containing(search.phoneNumber)
        }

        if (FilterHandler.isNotEmptyOrWhitespace(search?.city)) {
            filter['customerOrder.city'] = MongoFilter.containing(search.city)
        }

        if (FilterHandler.isNotEmptyOrWhitespace(search?.country)) {
            filter['customerOrder.country'] = MongoFilter.containing(search.country)
        }

        if (FilterHandler.isNotEmptyOrWhitespace(search?.firstname)) {
            filter['customerOrder.firstname'] = MongoFilter.containing(search.firstname)
        }

        if (search?.isMale !== undefined && search?.isMale !== null) {
            filter['customerOrder.isMale'] = search.isMale
        }

        if (MongoFilter.hasRange(search, 'endDate')) {
            MongoFilter.toRangeSearch(search, filter, 'endDate')
        }

        if (MongoFilter.hasRange(search, 'dateOfCreation')) {
            MongoFilter.toRangeSearch(search, filter, 'dateOfCreation')
        }

        if (MongoFilter.hasRange(search, 'count')) {
            MongoFilter.toRangeSearch(search, filter, 'countOfOrder', 'count')
        }

        if (MongoFilter.hasRange(search, 'cost')) {
            MongoFilter.toRangeSearch(search, filter, 'cost')
        }

        return filter
    }
}

export default OrderFilter