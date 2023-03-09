import React, { Fragment, useState, useEffect } from "react";
import { MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from "mdb-react-ui-kit";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../../Database/firebase";

import { useAuthState } from "react-firebase-hooks/auth";

const LoginTab = (props) => {
    const navigate = useNavigate();
    //Login
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginUser, loginLoading, loginError] = useAuthState(auth);

    //Error Control
    const [errorMsgSignIn, setErrorMsgSignIn] = useState("");
    const [loadSignin, setLoadSignin] = useState(false);
    const [showLoginAlert, setShowLoginAlert] = useState(false);

    useEffect(() => {
        if (loginLoading) {
            // maybe trigger a loading screen
            return;
        }
        if (loginUser) {
            navigate("../Dashboard/", {
                state: {
                    uid: loginUser.uid,
                },
                replace: true,
            });
        }

        if (loginError) {
            console.log(loginError);
        }
    }, [loginUser, ]);

    
    const handleLogin = () => {
        setLoadSignin(true);

        const err = logInWithEmailAndPassword(loginEmail, loginPassword);
        
        err.then((value) => {
            
            if (value) {
                setShowLoginAlert(true);
                setLoadSignin(false);
                setErrorMsgSignIn(value);
            }
        });
    };
    return (
        <Fragment>
            <div className="text-center mb-3">
                <p>Sign in with:</p>

                <div
                    className="d-flex justify-content-between mx-auto"
                    style={{ width: "50%" }}
                >
                    <MDBBtn
                        tag="a"
                        color="none"
                        className="m-1"
                        style={{ color: "#1266f1" }}
                    >
                        <MDBIcon fab icon="facebook-f" size="lg" />
                    </MDBBtn>

                    <MDBBtn
                        tag="a"
                        color="none"
                        className="m-1"
                        style={{ color: "#1266f1" }}
                    >
                        <MDBIcon fab icon="twitter" size="lg" />
                    </MDBBtn>

                    <MDBBtn
                        tag="a"
                        color="none"
                        className="m-1"
                        style={{ color: "#1266f1" }}
                    >
                        <MDBIcon fab icon="google" size="lg" />
                    </MDBBtn>

                    <MDBBtn
                        tag="a"
                        color="none"
                        className="m-1"
                        style={{ color: "#1266f1" }}
                    >
                        <MDBIcon fab icon="github" size="lg" />
                    </MDBBtn>
                </div>

                <p className="text-center mt-3">or:</p>
            </div>

            <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="form1"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
            />
            <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form2"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
            />

            <MDBBtn
                className="mb-4 w-100"
                onClick={handleLogin}
                disabled={loadSignin}
            >
                {loadSignin && (
                    <i
                        className="fa fa-refresh fa-spin"
                        style={{ marginRight: "5px" }}
                    />
                )}
                {loadSignin && <span>Signing In</span>}
                {!loadSignin && <span>Sign In</span>}
            </MDBBtn>
            <Alert
                show={showLoginAlert}
                variant="danger"
                onClose={() => setShowLoginAlert(false)}
                dismissible
            >
                <Alert.Heading>Login Error. Please try again.</Alert.Heading>
                <p>{errorMsgSignIn}</p>
            </Alert>
        </Fragment>
    );
};

export default LoginTab;
