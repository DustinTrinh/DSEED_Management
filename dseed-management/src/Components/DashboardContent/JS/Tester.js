import React, { Fragment, useState, useEffect } from "react";
import { db, auth } from "../../Database/firebase";
import { uuidv4 } from "@firebase/util";
import {
    collection,
    addDoc,
    Timestamp,
    query,
    orderBy,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
    where,
    getDocs,
} from "firebase/firestore";
import Carousel from 'react-bootstrap/Carousel';
import User from "../../Classes/User";
import Payment from "../../Classes/Payment";
import Applications from "../../Data/Applications";
import Application from "../../Classes/Application";
import Subscription from "../../Classes/Subscription";
import Updates from "../../Classes/Updates";

const Tester = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tasks, setTasks] = useState([]);
    const [fb, setFbs] = useState([]);
    const [users, setUsers] = useState([]);
    const userId = auth.currentUser?.uid;

    const user = new User(auth.currentUser?.uid);

    //Create
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "tasks"), {
                title: title,
                description: description,
                completed: false,
                created: Timestamp.now(),
            });
        } catch (err) {
            alert(err);
        }
    };

    //Update
    const handleUpdate = async (e) => {
        e.preventDefault();
        const taskDocRef = doc(db, "tasks", "95cpLFVpZ8FMTixodv9D");
        try {
            await updateDoc(taskDocRef, {
                title: "Update Again",
                description: "Just Testing the updates 2",
            });
        } catch (err) {
            alert(err);
        }
    };

    //Read
    useEffect(() => {
        const taskColRef = query(
            collection(db, "tasks"),
            orderBy("created", "desc")
        );

        onSnapshot(taskColRef, (snapshot) => {
            setTasks(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
        });
    }, []);

    //Delete
    const handleDel = () => {
        const taskDocRef = doc(db, "tasks", "tvAdab4lFL56A670jfLM");
        try {
            deleteDoc(taskDocRef);
        } catch (err) {
            alert(err);
        }
    };

    //Using Where Clause
    const fetchData = () => {
        const taskColRef2 = query(
            collection(db, "users"),
            where("uid", "==", userId)
        );

        onSnapshot(taskColRef2, (snapshot) => {
            setUsers(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
        });

        console.log(users);
        console.log(process.env.REACT_APPSTRIPE_PUBLISHABLE_KEY);
        console.log(process.env.REACT_APP_STRIPE_SECRET_KEY);
    };

    const fetchData2 = async () => {
        const taskColRef2 = query(
            collection(db, "feedback"),
            where("category", "==", "1")
        );
        const taskRef = collection(db, "feedback");
        const q = query(taskRef, where("category", "==", "1"));
        const querySnapshot = await getDocs(q);

        onSnapshot(taskColRef2, (snapshot) => {
            setFbs(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
        });
    };

    const getUserInfo = () => {
        user.getUserInfo();

        console.log(user);
    };

    const paymentTableHanding = async () => {
        const payment = new Payment();
        const paymentMap = new Map();
        const paymentList = payment.getTransactionHistory(userId);

        /*
        (await paymentList).map((payment)=>{
            paymentMap.set(payment.data.paymentID, payment.data.price);
        })
       console.log(paymentMap)
        */
        (await paymentList).map((payment) => {
            console.log(payment);
        });
    };

    const subscriptionHandle = async()=>{
        const tempUser = new Subscription(userId);
        //tempUser.createSubscriptionTable();
        //tempUser.addSubscription(3);
        //tempUser.removeSubscription(1);
        const subsList = tempUser.fetchSubscription();

        subsList.then((sub) => {
            const tempSet = new Set(sub.SubscriptionList);
            console.log(tempSet.has(3));
        })
    }

    const appTableHandle = async () => {
        const app = new Application();
        const appList = app.getAllApplications();

       console.log(appList);
        
    };

    const updateTableHandle = async() => {
        const update = new Updates();
        const tempObject = {Version: "1.2.5", Date: "Test2", Update: "Test3"}
        /*
        update.getDocIDByAppID(1).then((val) => {
            update.addUpdate(val, tempObject);
        });
        */
        update.fetchUpdates(1).then((val)=>{
            console.log(val);
        })
    }

    return (
        <Fragment>
            <h1>Tester Page</h1>
            <div>
                <form
                    onSubmit={handleSubmit}
                    className="addTask"
                    name="addTask"
                >
                    <input
                        type="text"
                        name="title"
                        onChange={(e) => setTitle(e.target.value.toUpperCase())}
                        value={title}
                        placeholder="Enter title"
                    />
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter task decription"
                        value={description}
                    ></textarea>
                    <button type="submit">Done</button>
                </form>
            </div>

            <div className="taskManager">
                <header>Task Manager</header>
                <div className="taskManager__container">
                    <div className="taskManager__tasks">
                        {tasks.map((task) => (
                            <div key={task.id}>
                                <h5>{task.id}</h5>
                                <h5>{task.data.completed}</h5>
                                <h5>{task.data.title}</h5>
                                <h5>{task.data.description}</h5>
                                <p>-----------------------------</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="taskManager">
                <header>Feedback Manager</header>
                <div className="taskManager__container">
                    <div className="taskManager__tasks">
                        {fb.map((f) => (
                            <div key={f.id}>
                                <h5>{f.id}</h5>
                                <h5>{f.data.category}</h5>
                                <h5>{f.data.description}</h5>
                                <h5>{f.data.issuer}</h5>
                                <p>-----------------------------</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <button onClick={handleUpdate}>Update Now</button>
            <button onClick={handleDel}>Delete Now</button>
            <button onClick={fetchData}>Console Log Data</button>
            <button onClick={fetchData2}>WHERE CLAUSE EXAMPLE</button>
            <button onClick={getUserInfo}>User Class Tester</button>
            <br />
            <button onClick={paymentTableHanding}>
                Payment Table Handling
            </button>
            <button onClick={appTableHandle}>Application Table Handling</button>
            <br />
            <button onClick={subscriptionHandle}>Subscription Handling</button>
            <br />
            <button onClick={updateTableHandle}>Create Updates</button>
        </Fragment>
    );
};

export default Tester;
