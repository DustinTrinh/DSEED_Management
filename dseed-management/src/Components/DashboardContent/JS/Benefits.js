import React, { Fragment } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Grid from "@mui/material/Grid";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import classes from "../CSS/Benefits.module.css";
import { FaCircle } from "react-icons/fa";
import CountUp from "react-countup";

import circle from "../../../Assets/SVG/circle5.svg";
import gift1 from "../../../Assets/SVG/gift1.svg";
import gift2 from "../../../Assets/SVG/gift2.svg";
import sb from "../../../Assets/SVG/scoreBlob.svg";
const Benefits = () => {
    return (
        <Fragment>
            <Grid  container spacing={2}>
                <Grid item xs={12} sm={4} md={4} className={classes.giftSvg}>
                    <div>
                    <img src={gift1} alt="Gift #1" />
                    </div>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <div className={classes.currentPoint} style={{}}>
                        <div
                            className={classes.countUp}
                            style={{ backgroundImage: `url(${sb})` }}
                        >
                            <CountUp className={classes.score} start={0} end={100} duration={1.5} />
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={4} md={4} className={classes.giftSvg}>
                    <div>
                    <img src={gift2} alt="Gift #2" />
                    </div>
                </Grid>
            </Grid>

            <Tabs
                defaultActiveKey="personalInfo"
                id="justify-tab-example"
                className="mb-4"
                justify
            >
                <Tab eventKey="earnPoints" title="Earn Points">
                    <h1>Earn</h1>
                </Tab>
                <Tab eventKey="resetPassword" title="Redeem">
                    <h2>Redeem</h2>
                </Tab>
            </Tabs>
        </Fragment>
    );
};

export default Benefits;
