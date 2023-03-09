import React, { Fragment } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Grid from "@mui/material/Grid";


import PersonalInfoTab from "../Account_Tabs/JS/PersonalInfoTab";
import ResetPasswordTab from "../Account_Tabs/JS/ResetPasswordTab";
import PaymentMethodTab from "../Account_Tabs/JS/PaymentMethodTab";
const Account = (props) => {  
    return (
        <Fragment>
            <Tabs
                defaultActiveKey="personalInfo"
                id="justify-tab-example"
                className="mb-4"
                justify
            >
                <Tab eventKey="personalInfo" title="Personal Information">
                    <PersonalInfoTab user={props.user}/>
                </Tab>
                <Tab eventKey="resetPassword" title="Reset Password">
                    <ResetPasswordTab user={props.user}/>
                </Tab>
                <Tab eventKey="PaymentMethod" title="Payment Method">
                    <PaymentMethodTab user={props.user}/>
                </Tab>
            </Tabs>
        </Fragment>
    );
};

export default Account;
