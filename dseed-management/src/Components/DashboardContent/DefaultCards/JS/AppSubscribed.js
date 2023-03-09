import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";

import classes from "../CSS/AppSubscribed.module.css";

export default function AppSubscribed(props) {
    return (
        <Fragment>
            <Card className={`${classes.animateCard} ${classes.cardLayout}`}>
                <Card.Body>
                    <Card.Title>
                        App(s) Subscribed
                    </Card.Title>

                    <Card.Subtitle className="mb-2 text-muted">
                        <h1>{props.subscribedNumber}</h1>
                    </Card.Subtitle>
                </Card.Body>
            </Card>
        </Fragment>
    );
}
