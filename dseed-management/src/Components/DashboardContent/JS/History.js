import React, { Fragment, useEffect, useState } from "react";
import { db, auth } from "../../Database/firebase";

import Table from "react-bootstrap/Table";
import Application from "../../Classes/Application";
import Payment from "../../Classes/Payment";
const History = () => {
    const userId = auth.currentUser?.uid;

    const [paymentList, setPaymentList] = useState([]);
    const [appList, setAppList] = useState(new Map());

    useEffect(() => {
        populateTransactionHistory();
    }, []);

    const populateTransactionHistory = async () => {
        const tempPaymentList = getAllPayments();
        const tempAppList = getAllApp();

        tempPaymentList.then((payment, index) => {
            setPaymentList(payment);
        });

        tempAppList.then((app) => {
            //console.log(app.);
            setAppList(app);
        });

        console.log(appList)
    };

    const getAllPayments = async () => {
        const payment = new Payment();
        const paymentList = payment.getTransactionHistory(userId);

        return paymentList;
    };

    const getAllApp = async () => {
        const app = new Application();
        const appMap = new Map();
        const appList = app.getAllApplications();

        (await appList).map((app) => {
            appMap.set(app.data.applicationID, app.data.applicationName);
        });

        return appMap;
    };

    return (
        <Fragment>
            <div>
                <h3>Downloads</h3>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Payment #</th>
                        <th>Application</th>
                        <th>Date</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        paymentList.map((payment, index) => (
                            <tr key={payment.data.paymentID}>
                                    <td>{payment.data.paymentID}</td>
                                    <td>{appList.get(parseInt(payment.data.applicationID))}</td>
                                    <td>{new Date(payment.data.date.seconds * 1000).toISOString().slice(0, 10)}</td>
                                    <td>${payment.data.price}</td>
                                </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Fragment>
    );
};

export default History;
