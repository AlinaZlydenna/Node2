import {useState, useCallback, useEffect} from "react";

const storageName = 'user'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [endDateToken, setEndDateToken] = useState(null)

    const login = useCallback((jwtToken, userData, endDateJwtToken) => {
        setToken(jwtToken)
        setUser(userData)
        setEndDateToken(endDateJwtToken)

        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken,
            user: userData,
            endDateToken: endDateJwtToken
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUser(null)
        setEndDateToken(null)
        localStorage.setItem(storageName, null)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.user, data.endDateToken)
        }
    }, [])

    const getToken = () => {
        if (!endDateToken) {
            return null
        }



        if (Date.now() < endDateToken) {
            return token
        }
        logout()
        return null
    }

    return {
        login, logout,
        token: getToken,
        user
    }
}