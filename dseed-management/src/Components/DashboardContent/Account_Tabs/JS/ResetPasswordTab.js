import React, { Fragment, useState } from "react";
import { MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from "mdb-react-ui-kit";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Grid from "@mui/material/Grid";
import {
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
} from "firebase/auth";

const ResetPasswordTab = (props) => {
    const user = props.user;
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [reenterPassword, setReenterPassword] = useState("");

    const [errorMsgResetPassword, setErrorMsgResetPassword] = useState("");
    const [loadResetPassword, setLoadResetPassword] = useState(false);
    const [showResetPasswordAlert, setResetPasswordAlert] = useState(false);

    const [variantAlert, setVarientAlert] = useState("danger");
    const [alertHeader, setAlertHeader] = useState("");

    let reauthenticaStatus = false;

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleChangeOldPassword = (event) => {
        setOldPassword(event.target.value);
    };

    const handleChangePassword = (event) => {
        setNewPassword(event.target.value);
    };

    const handleChangeReenter = (event) => {
        setReenterPassword(event.target.value);
    };

    const handleResetPassword = async (event) => {
        event.preventDefault();
        console.log(user.uid);
        console.log("New Pass: " + newPassword);
        console.log("Reenter: " + reenterPassword);
        setLoadResetPassword(true);

        const credential = EmailAuthProvider.credential(
            user.email,
            oldPassword
        );

        await reauthenticateWithCredential(user, credential)
            .then(() => {
                reauthenticaStatus = true;
            })
            .catch((error) => {
                setVarientAlert("danger");
                setResetPasswordAlert(true);
                setAlertHeader("Error: " + error.code);
                setErrorMsgResetPassword(error.message);
                reauthenticaStatus = false;
            });

        if (newPassword === reenterPassword && reauthenticaStatus) {

            updatePassword(user, newPassword)
                .then(() => {
                    console.log("Succeed!");
                    setVarientAlert("success");
                    setResetPasswordAlert(true);
                    setAlertHeader("Success");
                    setErrorMsgResetPassword("Successfully Updated Password.");
                })
                .catch((error) => {
                    setVarientAlert("danger");
                    setResetPasswordAlert(true);
                    setAlertHeader("Error: " + error.code);
                    setErrorMsgResetPassword(error.message);
                });
        } else {
            setVarientAlert("danger");
            setResetPasswordAlert(true);
            setAlertHeader("Error Reseting Password");
            setErrorMsgResetPassword("Please ensure 2 passwords are the same. And the old password is correct.");
        }
        await delay(1000);
        console.log("COME HERE");
        setLoadResetPassword(false);
    };
    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <Form onSubmit={handleResetPassword}>
                        <Form.Group className="mb-4" controlId="RP_OldPassword">
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e) => handleChangeOldPassword(e)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="RP_NewPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e) => handleChangePassword(e)}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-4"
                            controlId="RP_ReenterPassword"
                        >
                            <Form.Label>Re-enter New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e) => handleChangeReenter(e)}
                            />
                        </Form.Group>

                        <MDBBtn
                            className="mb-4 w-100"
                            disabled={loadResetPassword}
                        >
                            {loadResetPassword && (
                                <i
                                    className="fa fa-refresh fa-spin"
                                    style={{ marginRight: "5px" }}
                                />
                            )}
                            {loadResetPassword && <span>Sending Email</span>}
                            {!loadResetPassword && (
                                <span>Send Reset Password Email</span>
                            )}
                        </MDBBtn>
                        <Alert
                            show={showResetPasswordAlert}
                            variant={variantAlert}
                            onClose={() => setResetPasswordAlert(false)}
                            dismissible
                        >
                            <Alert.Heading>{alertHeader}</Alert.Heading>
                            <p>{errorMsgResetPassword}</p>
                        </Alert>
                    </Form>
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
        </Fragment>
    );
};

export default ResetPasswordTab;
