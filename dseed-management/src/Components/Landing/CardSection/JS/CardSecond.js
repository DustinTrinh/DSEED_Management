import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import manage from "../../../../Assets/CardImg/manage.svg";

import classes from "../CSS/Card.module.css";

const CardSecond = () => {
    return (
        <Fragment>
            <Card className={classes.cardLayout}>
                <Card.Img variant="top" src={manage} />
                <Card.Body>
                    <Card.Title>2. Subscribe/Unsubscribe</Card.Title>
                    <Card.Text>
                        Easily Subscribe/Unsubscribe thorugh the dashboard. Only pay for applications that could enhance your lifestyle.
                    </Card.Text>
                </Card.Body>
            </Card>
        </Fragment>
    );
};

export default CardSecond;
