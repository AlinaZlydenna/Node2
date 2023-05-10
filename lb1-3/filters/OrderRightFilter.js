class OrderRightFilter {
    constructor(user, orderId) {
        let filter = {
            ids: [orderId]
        }

        if (user.role === 'CUSTOMER') {
            filter.userIds = [user.id]
        }

        return filter
    }

    static of(user) {
        if (user.role === 'CUSTOMER') {
            return {
                userIds: [user.id]
            }
        }
        return {}
    }
}

export default OrderRightFilter