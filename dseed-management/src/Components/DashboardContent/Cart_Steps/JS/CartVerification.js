import React, { Fragment } from 'react';
import Card from "react-bootstrap/Card";
import Grid from "@mui/material/Grid";
import Button from 'react-bootstrap/esm/Button';

import classes from "../CSS/CartSteps.module.css";

const CartVerification = () => {
    return(
        <Fragment>
            <Card className={classes.cardLayout}>
                <Card.Img variant="top" src="https://via.placeholder.com/150" />
                <Card.Body>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                           <div>
                                <Card.Title>Card Title</Card.Title>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <Button className="float-end" variant="primary">Go somewhere</Button>
                        </Grid>
                    </Grid>
                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default CartVerification;