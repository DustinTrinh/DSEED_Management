import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import subscribe from "../../../../Assets/CardImg/subscribe.svg";
import payment from "../../../../Assets/CardImg/payment.svg";

import classes from "../CSS/Card.module.css";

const CardThird = () => {
    return (
        <Fragment>
            <Card className={classes.cardLayout}>
                <Card.Img variant="top" src={payment} />
                <Card.Body>
                    <Card.Title>3. Secure Payment</Card.Title>
                    <Card.Text>
                     Stripe is a certified PCI Service Provider Level 1. This is the most stringent level of certification available in the payments industry. Users' privacy and security has always been our top priority.
                    </Card.Text>
                </Card.Body>
            </Card>
        </Fragment>
    );
};

export default CardThird;
