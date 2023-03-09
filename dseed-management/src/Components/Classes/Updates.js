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
    arrayUnion,
    arrayRemove,
    doc,
} from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { db } from "../Database/firebase";

class Updates {
    constructor(){
        this.appID = 0;
        this.appUpdates = [{Version: "1.2.3", Date: Timestamp.now(), Update: "Test2"}];
    }

    createUpdatesTable = async(appID) => {
        try {
            await addDoc(collection(db, "updates"), {
                applicationID: appID,
                updates: this.appUpdates
            });
        } catch (err) {
            alert(err);
        }
    }

    getDocIDByAppID2 = async(appID) => {
        let docID = "";
        const q = query(
            collection(db, "updates"),
            where("applicationID", "==", appID)
            
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            docID = doc.id;
        });

        return docID;
    }

    getDocIDByAppID = async(appID) =>{
        let docID = "";
        try {
            const q = query(
                collection(db, "updates"),
                where("applicationID", "==", appID)
            );
            const doc = await getDocs(q);
            docID = doc.docs[0].id;
        }     catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
        finally{
            return docID;
        }
    }

    addUpdate = async(docID, update) => {
    
        const subsRef = doc(db, "updates", docID);
        try{
            await updateDoc(subsRef, {
                updates: arrayUnion(update)
            });
        }
        catch (err) {
            alert(err);
        }
    }

    fetchUpdates = async() => {
        const updates =[];
        const q = query(
            collection(db, "updates"),
            //where("applicationID", "==", appID)
            //orderBy("Date", "desc")
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            updates.push({
                id: doc.id,
                data: doc.data()
            })
        });

        return updates;
    }
}

export default Updates;