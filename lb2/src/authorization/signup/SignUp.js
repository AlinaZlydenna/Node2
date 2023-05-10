import Input from "../../tools/Input";
import "./sign_up.css"
import AuthorizationBody from "../../tools/AuthorizationBody";
import fon from "./sing_up_fon.jpg"
import {useState} from "react";
import ChooseLocation from "../../location/ChooseLocation";
import {useRegistrationUser} from "./useRegistrationUser";

const DEFAULT_GENDER = false;

function SignUp() {
    const [male, setMale] = useState(DEFAULT_GENDER);
    const [loadingSave, saveUser] = useRegistrationUser()

    async function toUrlParameters(e) {
        e.preventDefault()
        const target = e.target;

        let user = {male};

        for (const param of target) {
            if (param.name && param.value) {
                user[param.name] = param.value
            }
        }

        await saveUser(user)
    }

    return (
        <AuthorizationBody img={fon}>
            <div className="container-form">
                <form className="form-sign-up" onSubmit={toUrlParameters}>
                    <h2>Sign up</h2>

                    <div className="input-container">
                        <Input attributes={{
                            type: "text", minLength: 2, maxLength: 60,
                            required: true, placeholder: "Firstname", name: "firstname"
                        }}
                        />
                        <Input attributes={{
                            type: "text", minLength: 2, maxLength: 60,
                            required: true, placeholder: "Lastname", name: "lastname"
                        }}/>
                    </div>
                    <div className="input-container">
                        <Input attributes={{
                            type: "text", pattern: "\\d{10,15}",
                            required: true, placeholder: "Phone number", name: "phoneNumber"
                        }}/>
                        <Input attributes={{
                            type: "text", minLength: 8, maxLength: 60,
                            required: true, placeholder: "Password", name: "password"
                        }}/>
                    </div>

                    <div className="input-container">
                        <ChooseLocation idCountryDatalist={"country-id"}></ChooseLocation>
                    </div>

                    <div className={"input-container"}>
                        <Input attributes={{
                            type: "email", minLength: 2, maxLength: 60,
                            placeholder: "Email", name: "email"

                        }}/>
                        <div className="gender-container">
                            <button type="button" className={"gender-container-button" +
                                (male ? " gender-container-button-active" : "")}
                                    onClick={() => setMale(true)}
                            >Male
                            </button>
                            <button type="button" className={"gender-container-button" +
                                (male ? "" : " gender-container-button-active")}
                                    onClick={() => setMale(false)}>Female
                            </button>
                        </div>
                    </div>

                    <div className="form-button-container">
                        <button type={"submit"} disabled={loadingSave} >Sign up</button>
                    </div>

                </form>
            </div>
        </AuthorizationBody>
    );
}

export default SignUp;

