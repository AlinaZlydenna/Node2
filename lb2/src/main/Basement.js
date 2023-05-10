import React from "react";
import InstagramImage from './instagram-img.png'
import FacebookImage from './facebook-img.png'
import TelegramImage from './telegram-img.png'
import './basement.css'

function Basement() {
    return (
        <div className="basement">
            <div className="basement-info">
                <p className="basement-name-cite">Lilac tangerine</p>
                <img className="basement-img" src={InstagramImage} alt="instagram"/>
                <img className="basement-img" src={FacebookImage} alt="facebook"/>
                <img className="basement-img" src={TelegramImage} alt="telegram"/>
            </div>
            <p className={'basement-info-text'}> Delivery across Ukraine is carried out by delivery
                services: "Nova Poshta".
            </p>
            <p className={'basement-info-text'}>"Nova Poshta" delivers to the post office, the index of
                which you specify when placing the order.</p>

        </div>
    )
}

export default Basement