import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import benefit from "../../../../Assets/CardImg/benefit.svg";
import classes from "../CSS/Value.module.css";

export default function Benefits() {
    return (
        <Fragment>
            <Card className={classes.cardHorizontal}>
                <Card.Img className={classes.cardImg} src={benefit} />
                <Card.Body>
                    <Card.Title>Reward System</Card.Title>
                    <Card.Text>
                        DSEED value our customers more than anything, hence, we
                        introduce a Reward system where they can earn points in
                        various ways: "Feedback', "Recommendation" or
                        "Subscription" to any application. Customers can redeem
                        points to obtain many gifts (to be updated frequently)
                        like "Free month subscription" or "Free test pack".
                        Enjoy!
                    </Card.Text>
                </Card.Body>
            </Card>
        </Fragment>
    );
}
