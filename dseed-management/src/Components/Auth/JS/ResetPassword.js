import React, { Fragment, useState, useEffect } from "react";
import { MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from "mdb-react-ui-kit";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { auth,sendPasswordReset } from "../../Database/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ResetPassword = () => {

    const [resetEmail, setResetEmail] = useState("");
    //Error Control
    const [errorMsgResetPassword, setErrorMsgResetPassword] = useState("");
    const [loadResetPassword, setLoadResetPassword] = useState(false);
    const [showResetPasswordAlert, setResetPasswordAlert] = useState(false);

    const [variantAlert, setVarientAlert] = useState("danger");
    const [alertHeader, setAlertHeader] = useState("");

    const handlePasswordReset = () => {
        setLoadResetPassword(true);

        sendPasswordReset(resetEmail).then((value) => {
            if(value){
                setVarientAlert("danger");
                setResetPasswordAlert(true);
                setAlertHeader("Error Reset Password");
                setErrorMsgResetPassword(value);
                
            }
            else{
                setVarientAlert("success");
                setResetPasswordAlert(true);
                setAlertHeader("Success");
                setErrorMsgResetPassword("Reset Email Link sent");
                
            }
            
            setLoadResetPassword(false);
        });
        setResetPasswordAlert(false)
    }
    
    return(
        <Fragment>

            <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="form1"
                type="email"
                onChange={(e) => setResetEmail(e.target.value)}
            />

            <MDBBtn
                className="mb-4 w-100"
                onClick={handlePasswordReset}
                disabled={loadResetPassword}
            >
                {loadResetPassword && (
                    <i
                        className="fa fa-refresh fa-spin"
                        style={{ marginRight: "5px" }}
                    />
                )}
                {loadResetPassword && <span>Sending Email</span>}
                {!loadResetPassword && <span>Send Reset Password Email</span>}
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
        </Fragment>
    )
}

export default ResetPassword;