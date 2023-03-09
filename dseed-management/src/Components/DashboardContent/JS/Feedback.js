import React, { Fragment, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { auth, db } from "../../Database/firebase";
import { query, collection, getDocs, where, addDoc, Timestamp  } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
const Feedback = () => {
    const [user, loading, error] = useAuthState(auth);
    const [category, setCategory] = useState("");
    const [desc, setDesc] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetchUserName();
        try {
            await addDoc(collection(db, "feedback"), {
                issuer: user.uid,
                category: category,
                description: desc,
                created: Timestamp.now(),
            });
        } catch (err) {
            alert(err);
        }
    };

    const fetchUserName = async () => {
        try {
            const q = query(
                collection(db, "users"),
                where("uid", "==", user?.uid)
            );
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    const handleSubmit2 = (e) => {
        console.log(e.event.target)
    };
    const handleChange = (event) => {
        console.log(event);
    };
    return (
        <Fragment>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formFeedbackSelect">
                    <Form.Label>Category</Form.Label>
                    <Form.Select defaultValue="0" onChange={(e) => setCategory(e.target.value)}>
                        <option value="0" disabled>
                            Choose a Category
                        </option>
                        <option value="1">Feedback</option>
                        <option value="2">Report Bug</option>
                        <option value="3">Other</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFeedbackDesc">
                    <Form.Label>Feedback Description</Form.Label>
                    <Form.Control as="textarea" rows={3}  onChange={(e) => setDesc(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Send Feedback
                </Button>
            </Form>
        </Fragment>
    );
};

export default Feedback;
