import React, { Fragment } from "react";
import Grid from "@mui/material/Grid";
import CardFirst from "./JS/CardFirst";
import CardSecond from "./JS/CardSecond";
import CardThird from "./JS/CardThird";

import classes from "./CSS/Card.module.css";

const CardSection = () => {
    return (
        <Fragment>
            <div id="features" className={classes.featureDiv}>
            <div className={classes.header}>
                <h1>Features</h1>
            </div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}><CardFirst/></Grid>
                <Grid item xs={12} md={4}><CardSecond/></Grid>
                <Grid item xs={12} md={4}><CardThird/></Grid>
            </Grid>
            </div>
        </Fragment>
    );
};

export default CardSection;
