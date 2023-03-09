import React, { Fragment } from "react";
import FAQ from "./FAQ";

import classes from "../CSS/FAQ.module.css";

export default function FAQSection() {
    return (
        <Fragment>
            <div id="faq" className={classes.faqDiv}> 
                <div className={classes.header}>
                    <h1>FAQ</h1>
                </div>
                <FAQ />
            </div>
        </Fragment>
    );
}
