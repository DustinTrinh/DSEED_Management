import React, { Fragment, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useLocation } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

import classes from "../CSS/NavBar.module.css";

const NavBar = () => {
    const [navActive, setNavActive] = useState(false);

    const location = useLocation();
    const locationPath = "#" + location.pathname;

    const changeNavBackground = () => {
        if (window.scrollY >= 300) {
            setNavActive(true);
        } else {
            setNavActive(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", changeNavBackground);

        return () => {
            window.removeEventListener("scroll", changeNavBackground);
        };
    }, [window.scrollY]);
    return (
        <Fragment>
            <Navbar
                expand="lg"
                collapseOnSelect
                fixed="top"
                className={
                    navActive
                        ? `${classes.nav} ${classes.active}`
                        : `${classes.nav}`
                }
            >
                <Container>
                    <Navbar.Brand className={classes.ecoBrand} href="/">
                        DSEED_Management
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="navMobile" />
                    <Navbar.Collapse id="navMobile">
                        <Nav className="me-auto">
                            <Nav.Link href="/#features">Features</Nav.Link>
                            <Nav.Link href="/#values">Values</Nav.Link>
                            <Nav.Link href="/#faq">FAQ</Nav.Link>
                        </Nav>
                        <Nav>
                            <Button>
                                <Nav.Link href="/LoginRegistration">
                                    Login/Registration
                                </Nav.Link>
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    );
};

export default NavBar;
