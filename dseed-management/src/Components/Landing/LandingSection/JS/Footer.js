import React, { Fragment } from "react";
import { Grid } from "@mui/material";

import classes from "../CSS/Footer.module.css";

export default function Footer() {
    return (
        <Fragment>
            <div className={classes.footerDiv}>
                <Grid container spacing={2}>
                    <Grid item xs={4} >
                        <div className={classes.intro}>
                            <h3>DSEED Manager</h3>
                            <h5>Manage the whole ecosystem in one page.</h5>
                            <br></br>
                            <h6>Address: 1198 Islington Avenue</h6>
                            <h6>Phone #: 416-825-5239</h6>
                            <h6>Email: dustintrinh98@gmail.com</h6>

                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <h3>Quick Links</h3>
                        <a href="https://www.dustintrinh.com" target="_blank" >Dustin Trinh</a>
                        <br></br>
                        <a href="https://dseed-introduction-dc361.web.app/" target="_blank" >DSEED Ecosystem Introduction</a>
                        <br></br>
                        <a href="/LoginRegistration">Quick Login/Registration</a>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    );
}
