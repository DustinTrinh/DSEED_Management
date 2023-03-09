import React, { useEffect, useState, Fragment } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { auth, logout } from "../../Database/firebase";
import Button from "react-bootstrap/Button";
import Default from "../../DashboardContent/JS/Default";
import DrawerInfo from "../../Data/DrawerInfo";
import Subscriptions from "../../DashboardContent/JS/Subscriptions";
import Benefits from "../../DashboardContent/JS/Benefits";
import Account from "../../DashboardContent/JS/Account";
import Feedback from "../../DashboardContent/JS/Feedback";
import History from "../../DashboardContent/JS/History";
import Badge from "@mui/material/Badge";

import classes from "../CSS/Dashboard.module.css";
import Tester from "../../DashboardContent/JS/Tester";
const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

const Dashboard = (props) => {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [clicked, setClicked] = useState("0");
    const [component, setComponent] = useState("Welcome");
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    useEffect(() =>{
        console.log(window.localStorage.getItem('globalUID'));
        console.log(window.localStorage.getItem('loggedIn'));
        if (!window.localStorage.getItem('loggedIn')) {
            navigate("/LoginRegistration");
        }
        
    }, [])
    


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const drawerClickedHandle = (component, e) => {
        setComponent(component);
        setClicked(e);
    };

    let theComponent = <Default />;
    switch (component) {
        case "Subscriptions":
            theComponent = <Subscriptions />;
            break;
        case "History":
            theComponent = <History />;
            break;
        case "Benefits":
            theComponent = <Benefits />;
            break;
        case "Account":
            theComponent = <Account user={user} />;
            break;
        case "Feedback":
            theComponent = <Feedback />;
            break;
        case "Tester":
            theComponent = <Tester />;
            break;
        default:
            console.log("IN DEFAULT")
            theComponent = <Default user={user} />;
    }
    const drawerInf = DrawerInfo.map((info, index) => (
        <ListItem key={info.id} disablePadding sx={{ display: "block" }}>
            <ListItemButton
                className={clicked === index ? classes.clickedTab : ""}
                onClick={(e) => drawerClickedHandle(`${info.onclick}`, index)}
                sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                }}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                    }}
                >
                    {info.id === "6" ? (
                        <Badge color="secondary" badgeContent={0} showZero>
                            {info.icon}
                        </Badge>
                    ) : (
                        <Badge color="secondary">{info.icon}</Badge>
                    )}
                </ListItemIcon>
                <ListItemText
                    primary={info.name}
                    sx={{ opacity: open ? 1 : 0 }}
                />
            </ListItemButton>
        </ListItem>
    ));
    const handleLogout = () => {
        logout();
        navigate("/");
    };
    return (
        <Fragment>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && { display: "none" }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <div className={classes.headerBar}>
                            <Row>
                                <Col></Col>
                                <Col className={classes.title}>
                                    <h2>{component}</h2>
                                </Col>
                                <Col>
                                    <Button
                                        variant="secondary"
                                        className="float-end"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === "rtl" ? (
                                <ChevronRightIcon />
                            ) : (
                                <ChevronLeftIcon />
                            )}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>{drawerInf}</List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />

                    {theComponent}
                </Box>
            </Box>
        </Fragment>
    );
};

export default Dashboard;
