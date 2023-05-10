import FilterHandler from './FilterHandler.js'
import MongoFilter from './MongoFilter.js'

class UserFilter {
    static async of(searchCriteria) {
        let filter = {}

        if (FilterHandler.isNotEmptyOrWhitespace(searchCriteria?.phoneNumber)) {
            filter.phoneNumber = MongoFilter.containing(searchCriteria.phoneNumber)
        }

        if (FilterHandler.isNotEmptyOrWhitespace(searchCriteria?.username)) {
            filter.phoneNumber = MongoFilter.eq(searchCriteria.username)
        }

        if (FilterHandler.isNotEmptyOrWhitespace(searchCriteria?.email)) {
            filter.email = MongoFilter.containing(searchCriteria.email)
        }

        if (FilterHandler.isNotEmptyOrWhitespace(searchCriteria?.city)) {
            filter.email = MongoFilter.containing(searchCriteria.city)
        }

        if (FilterHandler.isNotEmptyOrWhitespace(searchCriteria?.country)) {
            filter.country = MongoFilter.containing(searchCriteria.country)
        }

        if (FilterHandler.isNotEmptyOrWhitespace(searchCriteria?.firstname)) {
            filter.firstname = MongoFilter.containing(searchCriteria.firstname)
        }

        if (FilterHandler.isNotEmptyOrWhitespace(searchCriteria?.lastname)) {
            filter.lastname = MongoFilter.containing(searchCriteria.lastname)
        }

        if (searchCriteria?.active !== undefined) {
            filter.active = MongoFilter.eq(searchCriteria.active)
        }

        if (searchCriteria?.male !== undefined) {
            filter.male = MongoFilter.eq(searchCriteria.male)
        }

        FilterHandler.setArrayIfNotNull(searchCriteria, 'ids')
        if (FilterHandler.isNotEmptyArray(searchCriteria?.ids)) {
            filter.id = MongoFilter.in(searchCriteria.ids)
        }

        FilterHandler.setArrayIfNotNull(searchCriteria, 'userStates')
        if (FilterHandler.isNotEmptyArray(searchCriteria?.userStates)) {
            filter.userState = MongoFilter.in(searchCriteria.userStates)
        }

        FilterHandler.setArrayIfNotNull(searchCriteria, 'roles')
        if (FilterHandler.isNotEmptyArray(searchCriteria?.roles)) {
            filter.role = MongoFilter.in(searchCriteria.roles)
        }

        if (searchCriteria?.dataOfRegistration) {
            MongoFilter.toRangeSearch(
                searchCriteria.dataOfRegistration,
                filter, 'dataOfRegistration')
        }

        return filter
    }
}

export default UserFilter