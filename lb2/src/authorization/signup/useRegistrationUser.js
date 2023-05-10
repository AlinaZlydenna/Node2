import {useState} from "react";
import {useNavigate} from "react-router-dom";

const URL_USER = "http://localhost:8100/authorization/sign-up";

function useRegistrationUser(){
    const [loadingSave,setLoadingSave] = useState(false)

    const navigate = useNavigate()

    const saveUserProxy = async user => {
        setLoadingSave(prev => !prev)
        const answer = await saveUser(user)

        setLoadingSave(prev => !prev)
        if(answer){
            navigate('/authorization/login', {replace: true})
        }
        return answer
    }

    return [loadingSave,saveUserProxy]
}

async function saveUser(user) {
    if (user === null) {
        return false;
    }

    const respond = await fetch(URL_USER, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (respond.status > 299) {
        alert(`User wasn't save. \nError: ${JSON.stringify(await respond.json())}`)
        return false;
    }

    return await respond.json()
}

export {useRegistrationUser}