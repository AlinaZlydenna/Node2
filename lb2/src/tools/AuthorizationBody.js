import React from "react";
import "./tools.css"

function AuthorizationBody({img, children}) {
    const bodyStyle = {
        minHeight: "100vh",
        backgroundImage: `url(${img})`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "100% 100%"
    }

    return (
        <div style={bodyStyle}>
            {children}
        </div>
    );
}

export default AuthorizationBody;