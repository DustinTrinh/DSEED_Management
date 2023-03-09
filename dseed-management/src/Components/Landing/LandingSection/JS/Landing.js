import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import CardSection from "../../CardSection/CardSection";
import Values from "../../ValueSection/Values";
import NavBar from "./NavBar";

import classes from "../CSS/Landing.module.css";
import FAQSection from "../../FAQ/JS/FAQSection";
import Footer from "./Footer";

import Bg from "../../../../Assets/SVG/background.svg";
import landingBG from "../../../../Assets/SVG/landingBG.svg";

const Landing = () => {
    return (
        <Fragment>
            <div className="d-flex align-items-center justify-content-center vh-100" 
            style={{ backgroundImage: `url(${landingBG})` }}>
                <div className={classes.overview}>
                    <h1>DSEED Management</h1>
                    <h5>An application where users can manage all of DSEED's ecosystem applications. Users can easily subscribe/unsubscribe, manage payment history, newsletter and benefits.</h5>
                </div>
            </div>
            <div style={{ backgroundImage: `url(${Bg})` }}>
                <CardSection/>
                <Values/>
                <FAQSection/>
            </div>
            <Footer/>
        </Fragment>
    );
};

export default Landing;
