import React, { Fragment } from "react";
import Accordion from "react-bootstrap/Accordion";
import FAQData from "../../../Data/FAQData";

import classes from "../CSS/FAQ.module.css";
export default function () {
    const faq = FAQData.map((fq, index) => (
        <Accordion.Item eventKey={fq.id}>
            <Accordion.Header>{fq.ques}</Accordion.Header>
            <Accordion.Body>{fq.ans}</Accordion.Body>
        </Accordion.Item>
    ));
    return (
        <Fragment>
            <Accordion defaultActiveKey={["0"]} alwaysOpen className={classes.accordian}>
                {faq}
            </Accordion>
        </Fragment>
    );
}
