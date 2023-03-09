import React from "react";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import {  db } from "./firebase";

const createPaymentTable= async()=>{
    try {
        await addDoc(collection(db, "Payments"), {
            userID: "MOCK User ID",
            ApplicationID: "MOCK App ID",
            Amount: 0,
            Date: Timestamp.now(),
        });
    } catch (err) {
        alert(err);
    }
}

export {createPaymentTable}