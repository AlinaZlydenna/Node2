import React from "react";
import "./tools.css"

function Input({attributes}) {
    attributes.className = "field-input";
    return (
        <input {...attributes}/>
    );
}

export default Input;