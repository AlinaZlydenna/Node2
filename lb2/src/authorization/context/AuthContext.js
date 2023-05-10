import {createContext} from "react";


export const AuthContext = createContext({
    token: () => {
    },
    user: null,
    login: (t, u, e) => {
    },
    logout: () => {
    },
    isAuthenticated: false
})