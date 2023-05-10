import React, {useContext} from "react"
import "./top_label.css"
import {AuthContext} from "../authorization/context/AuthContext";
import {Link} from "react-router-dom";
import Role from "./enums/Role";

const navigateStyle = {
    paddingBottom: "45px"
}

function TopLabel() {
    const auth = useContext(AuthContext)

    return (
        <nav style={navigateStyle}>
            <h1 className="top-label-h1-text">
                <Link style={{color: "#520974"}} to={'/'}>Lilac tangerine</Link>
            </h1>
            <div className="line-button-box">
                <div className="line-button-box-margin-top">
                    <div className="line-button-box-margin-top-center">

                        {getLabelByRole(auth.isAuthenticated, auth.user?.role)}

                        <p> | </p>
                        {auth.isAuthenticated ?
                            <Link to={'/authorization/login'} onClick={() => auth.logout()}>Log out</Link> :
                            <Link to={'/authorization/login'}>Log in</Link>}


                    </div>
                </div>
            </div>
        </nav>
    )
}

export default TopLabel

function getLabelByRole(isAuthenticated, role) {
    if (!isAuthenticated) {
        return <>
            <Link to={'../authorization/login'}>Create your own order</Link>
        </>
    }

    if (Role.ADMINISTRATION === role) {
        return <>
            <Link to={'../order/management'}>{'Management'}</Link>
        </>
    }

    if (Role.CUSTOMER === role) {
        return <>
            <Link to={'../order/create'}>Create your own order</Link>
            <p> | </p>
            <Link to={'../order/office'}>{'Personal office'}</Link>

        </>
    }

    return <p>Role : {role}</p>
}