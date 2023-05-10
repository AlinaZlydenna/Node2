import FilterHandler from "./FilterHandler.js";

class BuyerOrderSearch {
    constructor(search, userId) {
        let orderSearch = {
            userIds: [userId]
        }

        if (FilterHandler.isNotEmptyArray(search?.ids)) {
            orderSearch.ids = search.ids
        }

        if (search['dateOfCreation.from']) {
            orderSearch['dateOfCreation.from'] = search['dateOfCreation.from']
        }

        if (search['dateOfCreation.to']) {
            orderSearch['dateOfCreation.to'] = search['dateOfCreation.to']
        }

        if (search['cost.from']) {
            orderSearch['cost.from'] = search['cost.from']
        }

        if (search['cost.to']) {
            orderSearch['cost.to'] = search['cost.to']
        }

        if (search?.status) {
            if (search.status instanceof Array) {
                orderSearch.orderStatuses = search.status
            } else {
                orderSearch.orderStatuses = [search.status]
            }
        }

        return orderSearch
    }
}

export default BuyerOrderSearch