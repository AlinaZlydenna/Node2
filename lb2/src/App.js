import './App.css';
import Login from "./authorization/login/Login";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignUp from "./authorization/signup/SignUp";
import {useAuth} from "./authorization/auth.hook";
import {AuthContext} from "./authorization/context/AuthContext";
import Main from "./main/Main";
import CreateSpecialOrder from "./order/CreateSpecialOrder";

import OrderShow from "./show.order/OrderShow";
import Role from "./tools/enums/Role";
import OrderManagement from "./administration/order.management/OrderManagement";
import OrderOffice from "./clients.office/orders/OrderOffice";


function App() {
    const {token, login, logout, user} = useAuth()
    const isAuthenticated = !!token() // true //


    return (
        <AuthContext.Provider value={{
            token, login, logout, user, isAuthenticated
        }}>
            <Router>
                <Routes>
                    {
                        routeByRole(user?.role, isAuthenticated)
                    }
                </Routes>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;


function routeByRole(role, isAuthenticated) {

    if (!isAuthenticated) {
        return <>
            <Route path="/" element={<Main/>}/>
            <Route path="/authorization/login" element={<Login/>}/>
            <Route path="/authorization/sign-up" element={<SignUp/>}/>
            <Route path="*" element={<Main/>}/>
        </>
    }

    if (role === Role.CUSTOMER) {
        return <>

            <Route path="/order/create" element={<CreateSpecialOrder/>}/>
            <Route path={'/order/office'} element={<OrderOffice/>}/>
            <Route path={'/order/show/:id'} element={<OrderShow/>}/>
            <Route path="/*" element={<Main/>}/>
        </>
    }

    if (role === Role.ADMINISTRATION) {
        return <>
            <Route path={'/order/management'} element={<OrderManagement/>}/>
            <Route path={'/order/show/:id'} element={<OrderShow/>}/>
            <Route path="/*" element={<Main/>}/>
        </>
    }


    return <>
        <Route path={'/order/show/:id'} element={<OrderShow/>}/>
        <Route path="/*" element={<Main/>}/>
    </>
}

