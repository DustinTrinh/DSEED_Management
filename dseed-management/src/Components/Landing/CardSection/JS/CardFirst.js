import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import account from "../../../../Assets/CardImg/account.svg";

import classes from "../CSS/Card.module.css";

const CardFirst = () => {
    return (
        <Fragment>
            <Card className={classes.cardLayout}>
                <Card.Img variant="top" src={account} />
                <Card.Body>
                    <Card.Title>1. Registration</Card.Title>
                    <Card.Text>
                        Create only one account and be able to use it across all DSEED ecosystem's applications.
                    </Card.Text>
                </Card.Body>
            </Card>
        </Fragment>
    );
};

export default CardFirst;
