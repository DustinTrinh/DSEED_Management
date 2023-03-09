import React from "react";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    Timestamp
} from "firebase/firestore";
import { db } from "../Database/firebase";
class User {

    constructor(uid, email="", name="", dob=Timestamp.now(), phone="", provider=""){
        this.uid = uid;
        this.email = email;
        this.name = name;
        this.dob = dob;
        this.phone = phone;
        this.provider = provider;
    }

    getUserInfo = async () => {
        try {
            const q = query(
                collection(db, "users"),
                where("uid", "==", this.uid)
            );
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            
            this.uid = data.uid;
            this.name = data.name;
            this.email = data.email;
            this.phone = data.phone;
            this.provider = data.provider;
            this.dob = data.DOB.seconds;
            
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    }

    getUserInfoPromise = async () => {
        const userInfo = new User();
        try {
            const q = query(
                collection(db, "users"),
                where("uid", "==", this.uid)
            );
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            
            userInfo.uid = data.uid;
            userInfo.name = data.name;
            userInfo.email = data.email;
            userInfo.phone = data.phone;
            userInfo.provider = data.provider;
            userInfo.dob = data.DOB.seconds;
            
        }     catch (err) {
            console.log(err);
            alert("An error occured while fetching user data");
        }
        finally{
            return userInfo;
        }
        
    }

    getUserDocID = async() =>{
        let docID = "";
        var docid;
        try {
            const q = query(
                collection(db, "users"),
                where("uid", "==", this.uid)
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
}

export default User;