class Role {
    static get CUSTOMER() {
        return 'CUSTOMER'
    }

    static get ADMINISTRATION() {
        return 'ADMINISTRATION'
    }

    static get values() {
        return [
            Role.ADMINISTRATION,
            Role.CUSTOMER
        ]
    }
}

export default Role