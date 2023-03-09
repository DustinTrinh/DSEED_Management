import React, { Fragment, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Grid from "@mui/material/Grid";
import { db, auth } from "../../Database/firebase";

import classes from "../CSS/Subscriptions.module.css";
import Application from "../../Classes/Application";
import { async } from "@firebase/util";
import Subscription from "../../Classes/Subscription";

import EE from "../../../Assets/SVG/App/EventEnabler.png";
import QW from "../../../Assets/SVG/App/QuizWorld.png";
import PI from "../../../Assets/SVG/App/Printeract.png";
import CS from "../../../Assets/SVG/App/Counseltant.png";
import BP from "../../../Assets/SVG/App/BProtective.png";

const Subscriptions = () => {
    const [appList, setAppList] = useState([]);
    const [subList, setSubList] = useState(new Set());
    const userId = auth.currentUser?.uid;

    useEffect(() => {
        populateAllApps();
        getSubscriptionList();
    }, []);

    const populateAllApps = async () => {
        const app = new Application();
        const allApp = app.getAllApplications();
        allApp.then((app, index) => {
            setAppList(app);
        });
    };

    const getSubscriptionList = async () => {
        const subscription = new Subscription(userId);
        const tempSublist = subscription.fetchSubscription();

        tempSublist.then((sub) => {
            const tempSet = new Set(sub.SubscriptionList);
            setSubList(tempSet);
        });
    };

    const populateAppIcon = (id) => {
        let returnIcon;
        console.log(id);
        switch (id) {
            case 1:
                returnIcon = EE;
                break;
            case 2:
                returnIcon = QW;
                break;
            case 3:
                returnIcon = PI;
                break;
            case 4:
                returnIcon = CS;
                break;
            case 5:
                returnIcon = BP;
                break;
            default:
                returnIcon = QW;
                break;
        }

        return returnIcon;
    };
    return (
        <Fragment>
            {appList.map((app, index) => (
                <Card className={classes.cardLayout} key={app.id}>
                    <Card.Img variant="top" src={populateAppIcon(app.data.applicationID)} />
                    <Card.Body>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={10}>
                                <div>
                                    <Card.Title>
                                        {app.data.applicationName}
                                    </Card.Title>
                                    {app.data.applicationDesc}
                                </div>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                {subList.has(app.data.applicationID) ? (
                                    <Button
                                        className={classes.subsButton}
                                        variant="primary"
                                    >
                                        Unsubscribe
                                    </Button>
                                ) : (
                                    <Button
                                        className={classes.subsButton}
                                        variant="primary"
                                    >
                                        Subscribe ${app.data.applicationPrice}
                                        /month
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </Card.Body>
                </Card>
            ))}
        </Fragment>
    );
};

export default Subscriptions;
