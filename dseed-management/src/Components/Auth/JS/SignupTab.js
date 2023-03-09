import React, { Fragment, useState, useEffect } from "react";
import { MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from "mdb-react-ui-kit";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../../Database/firebase";

import { useAuthState } from "react-firebase-hooks/auth";

const SignupTab = () => {
    //Signup
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupName, setSignupName] = useState("");
    const [signupUser, signupLoading, signupError] = useAuthState(auth);

    //Error Control
    const [errorMsgSignUp, setErrorMsgSignInSignUp] = useState("");

    const [loadSignup, setLoadSignup] = useState(false);
    const [showSignupAlert, setShowSignupAlert] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (signupUser) {
            navigate("/Dashboard");
        }
    }, [signupUser, signupLoading]);

    const handleSignup = () => {
        setLoadSignup(true);
        if (!signupName || !signupEmail || !signupPassword) {
            setLoadSignup(false);
        }
        const err = registerWithEmailAndPassword(
            signupName,
            signupEmail,
            signupPassword
        );
        err.then((value) => {
            if (value) {
                setShowSignupAlert(true);
                setLoadSignup(false);
                setErrorMsgSignInSignUp(value);
            }
        });
    };
    return (
        <Fragment>
            <div className="text-center mb-3">
                <p>Sign un with:</p>

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
                label="Name"
                id="signupName"
                type="text"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
            />
            <MDBInput
                wrapperClass="mb-4"
                label="Email"
                id="signupEmail"
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
            />
            <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="signupPassword"
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
            />

            <div className="d-flex justify-content-center mb-4">
                <MDBCheckbox
                    name="flexCheck"
                    id="flexCheckDefault"
                    label="I have read and agree to the terms"
                />
            </div>

            <MDBBtn
                className="mb-4 w-100"
                onClick={handleSignup}
                disabled={loadSignup}
            >
                {loadSignup && (
                    <i
                        className="fa fa-refresh fa-spin"
                        style={{ marginRight: "5px" }}
                    />
                )}
                {loadSignup && <span>Creating Account</span>}
                {!loadSignup && <span>Sign Up</span>}
            </MDBBtn>
            <Alert
                show={showSignupAlert}
                variant="danger"
                onClose={() => setShowSignupAlert(false)}
                dismissible
            >
                <Alert.Heading>Signup Error. Please try again.</Alert.Heading>
                <p>{errorMsgSignUp}</p>
            </Alert>
        </Fragment>
    );
};

export default SignupTab;
