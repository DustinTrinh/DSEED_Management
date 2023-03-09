import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import support from "../../../../Assets/CardImg/support.svg";

import classes from "../CSS/Value.module.css";

export default function Support() {
    return (
        <Fragment>
            <Card className={classes.cardHorizontal}>
                <Card.Body>
                    <Card.Title>Support</Card.Title>
                    <Card.Text>
                        DSEED is strive to provide users with the best experience. We offer 24/7 support whenever users have questions or problems. 
                    </Card.Text>
                </Card.Body>
                <Card.Img className={classes.cardImg} src={support} />
            </Card>
        </Fragment>
    );
}
