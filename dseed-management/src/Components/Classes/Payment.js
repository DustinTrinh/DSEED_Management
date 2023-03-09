import React from "react";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    Timestamp,
    addDoc,
    orderBy,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { db } from "../Database/firebase";

class Payment {
    constructor(
        paymentID = "",
        userID = "",
        applicationID = "",
        price = "",
        date = new Date(Timestamp.now().seconds * 1000)
            .toISOString()
            .slice(0, 10)
    ) {
        this.paymentID = paymentID;
        this.uid = userID;
        this.applicationID = applicationID;
        this.price = price;
        this.date = date;
    }

    createPaymentTable = async () => {
        try {
            await addDoc(collection(db, "payments"), {
                paymentID: this.paymentID,
                UID: this.uid,
                applicationID: this.applicationID,
                price: this.price,
                date: this.date,
            });
        } catch (err) {
            alert(err);
        }
    };

    addPayment = async (userID, applicationID, price) => {
        try {
            await addDoc(collection(db, "payments"), {
                paymentID: uuidv4(),
                UID: userID,
                applicationID: applicationID,
                price: price,
                date: Timestamp.now(),
            });
        } catch (err) {
            alert(err);
        }
    };

    getTransactionHistory = async (uid) => {
        const paymentList = [];

        const q = query(
            collection(db, "payments"),
            where("UID", "==", uid),
            orderBy("date", "desc")
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            paymentList.push({
                id: doc.id,
                data: doc.data()
            })
        });

        return paymentList;
    };
}

export default Payment;
