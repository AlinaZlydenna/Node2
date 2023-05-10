import React from "react";
import TopLabel from "../tools/TopLabel";
import WorksPeople from './WorksPeople.png'
import './main_page.css'
import MaterialSlider from "./MaterialSlider";
import SpecialOrderImage from './not_template.png'
import Basement from "./Basement";
import Counter from "../tools/Counter";

function Main() {
    return (
        <div className={'main-body'}>
            <TopLabel/>
            <div>
                <h1 style={{textAlign: "center"}} className={'main-page-topic-text'}>ABOUT US</h1>
                <div className="box-elements-space-around-row">
                    <img className="about-ua-describe-image" src={WorksPeople} alt="WorkPeople"
                         style={{borderRadius: "15px"}}/>
                    <p className="about-ua-describe-text">
                        Our company was founded in 2022 as tailoring company. Since then, we have built a reputation as
                        one of
                        the leading Tailoring companies in the Ukraine. We develop our own design without relying on
                        trends.
                        And if you want something of your own, we can help you with the implementation.
                    </p>
                </div>
            </div>

            <div>
                <h2 style={{textAlign: "center"}} className={'main-page-topic-text'}>MATERIALS</h2>
                <div className="box-elements-space-around-row">
                    <p className="about-ua-describe-text">
                        Our materials are of European quality, many different colors. Materials from trusted suppliers
                        who have
                        been on the market for more than 10 years.
                    </p>
                    <MaterialSlider/>
                </div>
            </div>

            <div>
                <h2 style={{textAlign: "center"}} className={'main-page-topic-text'}>WHAT WE DO </h2>
                <div className="box-elements-space-around-row what-we-do-order-box">

                    <div className="what-we-do-order">
                        <img src={SpecialOrderImage} alt="Special the order Image"/>
                        <h3>Special the order</h3>
                        <p>If you want, what is not on the market. You can order from us using the convenient order
                            creation
                            design.</p>
                    </div>
                </div>
            </div>
            <Basement/>
        </div>
    )
}


export default Main