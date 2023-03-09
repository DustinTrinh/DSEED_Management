import React from "react";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
} from "firebase/firestore";
import User from "../Classes/User";
import {  db } from "./firebase";

const getUserInfo = async (user) => {
    const userInfo = new User();
    try {
        const q = query(
            collection(db, "users"),
            where("uid", "==", user?.uid)
        );
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        
        //console.log(data);
        
        userInfo.uid = data.uid;
        userInfo.name = data.name;
        userInfo.email = data.email;
        userInfo.phone = data.phone;
        userInfo.provider = data.provider;
        userInfo.dob = data.DOB.seconds;
        //return userInfo;
        
    }     catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
    }
    finally{
        return userInfo;
    }
    
}

export {getUserInfo}