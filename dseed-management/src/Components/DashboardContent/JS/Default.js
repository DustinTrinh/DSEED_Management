import React, { Fragment, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Grid } from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { logout } from "../../Database/firebase";

import classes from "../CSS/Home.module.css";
import User from "../../Classes/User";
import { getUserInfo } from "../../Database/UserDB";
import { async } from "@firebase/util";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Database/firebase";
import Subscription from "../../Classes/Subscription";
import AppSubscribed from "../DefaultCards/JS/AppSubscribed";
import NameCard from "../DefaultCards/JS/NameCard";
import Newsfeed from "../DefaultCards/JS/Newsfeed";

const Default = () => {
    //Super Large Card (personal Info)
    //Number of app subsribe
    //Points
    //Monthly fee
    //Newsfeed
    const navigate = useNavigate();

    const [user, loading, error] = useAuthState(auth);
    const userUID = window.localStorage.getItem("globalUID");
    const [userInfo, setUserInfo] = useState(new User(userUID));
    const [dob, setDob] = useState("");
    const [appSubscribe, setAppSubcribe] = useState(0);

    useEffect(() => {
        if (!window.localStorage.getItem("loggedIn")) {
            return navigate("/");
        }

        userInfo.getUserInfoPromise().then((info) => {
            setUserInfo(info);
            let dateConverter = new Date(info.dob * 1000)
                .toISOString()
                .slice(0, 10);
            setDob(dateConverter);
        });
        getSubscriptionList();
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const getSubscriptionList = async () => {
        const subscription = new Subscription(userUID);
        const tempSublist = subscription.fetchSubscription();

        tempSublist.then((sub) => {
            console.log(sub.SubscriptionList.length);
            setAppSubcribe(sub.SubscriptionList.length);
        });
    };

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    className={`${classes.gridLayout} `}
                >
                    <NameCard userInfo={userInfo} dob={dob} />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={4}
                    lg={4}
                    className={`${classes.gridLayout} `}
                >
                    <AppSubscribed subscribedNumber={appSubscribe} />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={4}
                    lg={4}
                    className={`${classes.gridLayout} `}
                >
                    <AppSubscribed subscribedNumber={appSubscribe} />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={4}
                    lg={4}
                    className={`${classes.gridLayout} `}
                >
                    <AppSubscribed subscribedNumber={appSubscribe} />
                </Grid>

                <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    className={`${classes.gridLayout} `}
                >
                    <Newsfeed />
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default Default;
