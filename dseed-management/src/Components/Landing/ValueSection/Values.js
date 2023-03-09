import React, { Fragment } from "react";

import { Grid } from "@mui/material";
import Benefits from "./JS/Benefits";

import classes from "./CSS/Value.module.css";
import Support from "./JS/Support";

export default function Values() {
    return (
        <Fragment >
            <div id="values" className={classes.valueDiv}>
            <div className={classes.header}>
                <h1>Our Values</h1>
            </div>
            <div >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Benefits />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Support />
                    </Grid>
                </Grid>
            </div>
            </div>
        </Fragment>
    );
}
