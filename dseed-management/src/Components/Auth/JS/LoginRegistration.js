import React, { Fragment, useState, useEffect } from "react";
import {
    MDBContainer,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../../Database/firebase";

import { useAuthState } from "react-firebase-hooks/auth";

import classes from "../CSS/LoginRegistration.module.css";
import { updatePassword } from "firebase/auth";
import LoginTab from "./LoginTab";
import SignupTab from "./SignupTab";
import ResetPassword from "./ResetPassword";

const LoginRegistration = () => {
    const [justifyActive, setJustifyActive] = useState("tab1");
    const [signupUser, signupLoading, signupError] = useAuthState(auth);
    const navigate = useNavigate();

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };

    useEffect(() => {
        if (signupUser) {
            navigate("/Dashboard");
        }
    }, [signupUser, signupLoading]);

    return (
        <Fragment>
            <div className={classes.loginForm}>
                <MDBContainer className="p-3  d-flex flex-column w-100 justify-content-center align-items-center h-100">
                    <MDBTabs
                        pills
                        justify
                        className="mb-3 d-flex flex-row justify-content-between"
                    >
                        <MDBTabsItem>
                            <MDBTabsLink
                                onClick={() => handleJustifyClick("tab1")}
                                active={justifyActive === "tab1"}
                            >
                                Login
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink
                                onClick={() => handleJustifyClick("tab2")}
                                active={justifyActive === "tab2"}
                            >
                                Register
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink
                                onClick={() => handleJustifyClick("tab3")}
                                active={justifyActive === "tab3"}
                            >
                                Reset Password
                            </MDBTabsLink>
                        </MDBTabsItem>
                    </MDBTabs>

                    <MDBTabsContent>
                        <MDBTabsPane show={justifyActive === "tab1"}>
                            <LoginTab />
                            <p className="text-center">
                                Not a member?{" "}
                                <a
                                    onClick={() => handleJustifyClick("tab2")}
                                    active={justifyActive === "tab2"}
                                    href="#!"
                                >
                                    Register
                                </a>
                            </p>
                            
                            <p className="text-center">
                                Forgot Password?
                                <a
                                    onClick={() => handleJustifyClick("tab3")}
                                    active={justifyActive === "tab3"}
                                    href="#!"
                                >
                                    Reset Password
                                </a>
                            </p>
                        </MDBTabsPane>

                        <MDBTabsPane show={justifyActive === "tab2"}>
                            <SignupTab />
                        </MDBTabsPane>
                        <MDBTabsPane show={justifyActive === "tab3"}>
                            <ResetPassword/>
                        </MDBTabsPane>
                        
                    </MDBTabsContent>
                </MDBContainer>
            </div>
        </Fragment>
    );
};

export default LoginRegistration;
