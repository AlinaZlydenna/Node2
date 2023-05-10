import React, {useCallback, useContext, useState} from "react";
import "./sign_in.css"
import Input from "../../tools/Input";
import AuthorizationBody from "../../tools/AuthorizationBody";
import fon from "./sign_in_fon.jpg"
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

function Login() {
    const auth = useContext(AuthContext)
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const requestLogin = useCallback(async (user) => {
        const respond = await fetch('http://localhost:8100/authorization/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
        })

        const data = await respond.json()

        if (!respond.ok || data.message) {
            return setError(true)
        }

        auth.login(data.token, data.user, data.endDateToken)
        navigate('../', {replace: true})
    }, [auth, navigate])

    return (
        <AuthorizationBody img={fon}>
            <div className={"container-form"}>
                <form className={"form-sign-in"} onSubmit={(e) => signIn(e, requestLogin)}>
                    <h2>Sign in</h2>
                    {
                        error ? <div className="errorMessage">Invalid phone number or password.</div> : <></>
                    }
                    <Input attributes={{
                        type: "text",
                        required: true,
                        placeholder: "Phone number",
                        pattern: "\\d{10,15}",
                        name: 'phoneNumber'
                    }}/>

                    <div className="user-field-input-with-text-container">
                        <Input attributes={{
                            type: "password",
                            required: true,
                            placeholder: "Password",
                            minLength: 8,
                            maxLength: 60,
                            name: 'password'
                        }}/>
                        <Link to="/authorization/sign-up"><em>Sign up</em></Link>

                        <div className="button-container-sign-in">
                            <button type={'submit'} className={"find-button"}>Log in</button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthorizationBody>
    );
}


function signIn(e, requestLogin) {
    e.preventDefault()

    const user = {
        phoneNumber: e.target['phoneNumber'].value,
        password: e.target['password'].value
    }

    requestLogin(user)
}

export default Login;
