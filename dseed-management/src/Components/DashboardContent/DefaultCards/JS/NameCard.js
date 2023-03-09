import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import Grid from "@mui/material/Grid";

import classes from "../CSS/NameCard.module.css";

import welcome from "../../../../Assets/SVG/NameCard/Welcome1.svg";
export default function NameCard(props) {
    return (
        <Fragment>
            <Card className={classes.cardLayout}>
                <Card.Img variant="top" src={welcome}/>
                <Card.Body>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <div>
                                <Card.Title>
                                    <h1>Welcome!</h1>
                                </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    <h5>UID: {props.userInfo.uid}</h5>
                                    <h5>Name: {props.userInfo.name}</h5>
                                    <h5>Date of Birth: {props.dob}</h5>
                                </Card.Subtitle>
                            </div>
                        </Grid>
                    </Grid>
                </Card.Body>
            </Card>
        </Fragment>
    );
}
