import React, { Fragment, useState, useEffect } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import Form from "react-bootstrap/Form";
import Grid from "@mui/material/Grid";
import Alert from "react-bootstrap/Alert";
import User from "../../../Classes/User";
import { getUserInfo } from "../../../Database/UserDB";
import {
    collection,
    Timestamp,
    query,
    onSnapshot,
    doc,
    updateDoc,
    where,
} from "firebase/firestore";
import { db } from "../../../Database/firebase";
const PersonalInfoTab = (props) => {
    //Default Placeholder
    const [user, setUser] = useState(props.user);
    const [userInfo, setUserInfo] = useState(new User());

    const [uid, setUid] = useState(user.uid);
    const [email, setEmail] = useState("");

    //Changed Variables
    const [edited, setEdited] = useState(false);
    const [name, setName] = useState("");
    const [editName, setEditName] = useState(false);
    const [dob, setDob] = useState("");
    const [phone, setPhone] = useState("");
    const [fsDob, setFsDob] = useState(new Date());
    const [docID, setDocID] = useState("");

    const [loadUpdateInfo, setLoadUpdateInfo] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const [variantAlert, setVarientAlert] = useState("success");
    const [alertHeader, setAlertHeader] = useState("Success");
    const [errorMsg, setErrorMsg] = useState("Successfully Update Information");

    useEffect(() => {
        getUserInformation();
    }, []);

    const getUserInformation = async() =>{
        const tempUser =new User(user.uid);
        const userInfo = tempUser.getUserInfoPromise();
        const userDocID = tempUser.getUserDocID();

        userInfo.then((info)=>{
            const dateOfBirth = new Date(info.dob*1000).toISOString().slice(0, 10);
            setUid(info.uid);
            setEmail(info.email);
            setName(info.name);
            setDob(dateOfBirth);
            setPhone(info.phone);
        })

        userDocID.then((id) => {
            setDocID(id);
        })
    }

    const handleNameChange = (event) => {
        console.log(event.target.value);
        setName(event.target.value);
        setEdited(true);
        setEditName(true);
    };

    const handleDOBChange = (event) => {
        const newDob = new Date(event.target.value);
        setDob(newDob);
        setEdited(true);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
        console.log(event.target.value);
        setEdited(true);
    };
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );
    const handleUpdatePersonalInfo = async (event) => {
        event.preventDefault();

        setLoadUpdateInfo(true);
        const taskDocRef = doc(db, "users", docID);
        try {
            
            
            updateDoc(taskDocRef, {
                name: name,
                DOB: Timestamp.fromDate(dob),
                phone: phone,
            });
            

            console.log(userInfo);
           
        } catch (err) {
            
            setShowAlert(true);
            setVarientAlert("danger");
            setAlertHeader("Error");
            setErrorMsg(err);
        }
        await delay(1000);
        setShowAlert(true);
        setLoadUpdateInfo(false);
        setEdited(false);
    };
    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <Form onSubmit={handleUpdatePersonalInfo}>
                        <Form.Group className="mb-4" controlId="PI_UID">
                            <Form.Label>UID</Form.Label>
                            <Form.Control
                                disabled
                                type="text"
                                value={uid}
                            />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="PI_Email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                disabled
                                type="email"
                                value={email}
                            />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="PI_Name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => handleNameChange(e)}
                                defaultValue={name}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="PI_DOB">
                            <Form.Label>Date of Birth</Form.Label>

                            <Form.Control
                                type="date"
                                onChange={(e) => handleDOBChange(e)}
                                defaultValue={dob}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="PI_Phone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="tel"
                                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                                onChange={(e) => handlePhoneChange(e)}
                                defaultValue={phone}
                            />
                        </Form.Group>

                        <MDBBtn
                           className="mb-4 w-100"
                            variant="primary"
                            type="submit"
                            disabled={edited ? false : true}
                        >
                            {loadUpdateInfo && (
                                <i
                                    className="fa fa-refresh fa-spin"
                                    style={{ marginRight: "5px" }}
                                />
                            )}
                            {loadUpdateInfo && <span>Updating Information</span>}
                            {!loadUpdateInfo && <span>Update Information</span>}
                        </MDBBtn>
                        <Alert
                            show={showAlert}
                            variant={variantAlert}
                            onClose={() => setShowAlert(false)}
                            dismissible
                        >
                            <Alert.Heading>{alertHeader}</Alert.Heading>
                            <p>{errorMsg}</p>
                        </Alert>
                    </Form>
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
        </Fragment>
    );
};

export default PersonalInfoTab;
