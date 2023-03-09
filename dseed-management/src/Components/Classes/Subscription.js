import React from "react";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    Timestamp,
    setDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    doc
} from "firebase/firestore";
import { db } from "../Database/firebase";
import User from "./User";
import { async } from "@firebase/util";

class Subscription extends User {
    constructor(uid, subsList = []){
        super(uid);
        this.subsList = subsList;
    }

    createSubscriptionTable = async()=>{
        try {
            await setDoc(doc(db, "subscriptions", this.uid), {
                UID: this.uid,
                SubscriptionList: this.subsList
            });
        } catch (err) {
            alert(err);
        }
    }

    addSubscription = async(appID) => {
        const subsRef = doc(db, "subscriptions", this.uid);
        try{
            await updateDoc(subsRef, {
                SubscriptionList: arrayUnion(appID)
            });
        }
        catch (err) {
            alert(err);
        }
    }

    removeSubscription = async(appID) => {
        const subsRef = doc(db, "subscriptions", this.uid);
        try{
            await updateDoc(subsRef, {
                SubscriptionList: arrayRemove(appID)
            });
        }
        catch (err) {
            alert(err);
        }
    }

    fetchSubscription = async() => {
        try {
            const q = query(
                collection(db, "subscriptions"),
                where("UID", "==", this.uid)
            );
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            
            return data;
            
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    }
}

export default Subscription;