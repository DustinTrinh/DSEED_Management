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

class Application {
    constructor(
        applicationID = "",
        applicationName = "",
        applicationDesc = "",
        applicationPrice = 0
    ) {
        this.applicationID = applicationID;
        this.applicationName = applicationName;
        this.applicationDesc = applicationDesc;
        this.applicationPrice = applicationPrice;
    }

    createApplicationTable = async (appId, appName, appDesc, appPrice) => {
        try {
            await addDoc(collection(db, "applications"), {
                applicationID: appId,
                applicationName: appName,
                applicationDesc: appDesc,
                applicationPrice: appPrice,
            });
        } catch (err) {
            alert(err);
        }
    };

    getAllApplications = async () => {
        const appList = [];

        const q = query(
            collection(db, "applications"),
            orderBy("applicationID")
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            appList.push({
                id: doc.id,
                data: doc.data()
            })
        });

        return appList;
    };
}

export default Application;
