class OrderStatus {
    static get PROCESSING() {
        return 'PROCESSING'
    }

    static get AWAITING_PRICE_CONFIRMATION() {
        return 'AWAITING_PRICE_CONFIRMATION'
    }

    static get UNDER_DEVELOPMENT() {
        return 'UNDER_DEVELOPMENT'
    }

    static get EXECUTED() {
        return 'EXECUTED'
    }

    static get SENT() {
        return 'SENT'
    }

    static get DONE() {
        return 'DONE'
    }

    static get CANCELLED() {
        return 'CANCELLED'
    }

    static get values() {
        return [
            OrderStatus.PROCESSING,
            OrderStatus.AWAITING_PRICE_CONFIRMATION,
            OrderStatus.UNDER_DEVELOPMENT,
            OrderStatus.EXECUTED,
            OrderStatus.SENT,
            OrderStatus.DONE,
            OrderStatus.CANCELLED
        ]
    }
}

export default OrderStatus