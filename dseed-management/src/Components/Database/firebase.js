import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import User from "../Classes/User";
const firebaseConfig = {
    apiKey: "AIzaSyAZjAXbI88Ys5RSnJ55KxVRMD0w_DA7buU",
    authDomain: "dseed-introduction-dc361.firebaseapp.com",
    projectId: "dseed-introduction-dc361",
    storageBucket: "dseed-introduction-dc361.appspot.com",
    messagingSenderId: "484703805482",
    appId: "1:484703805482:web:cb192fe9c5a744235d2353",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
        
        await signInWithEmailAndPassword(auth, email, password).then(
            (userCredential) => {
                const user = userCredential.user;
                window.localStorage.setItem('globalUID', user.uid);
                window.localStorage.setItem('loggedIn', true);
            }
            
        );
        
    } catch (err) {
        const errorCode = err.code;
        const errorMessage = err.message;
        const error = errorCode + " " + errorMessage;
        return error;
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        
        const user = new User(res.user.uid, email, name, Timestamp.now(), parseInt("0000000000"), "local")

        await addDoc(collection(db, "users"), {
            uid: user.uid,
            email: user.email,
            name: user.name,
            DOB: user.dob,
            phone: user.phone,
            provider: user.provider
        });
        window.localStorage.setItem('globalUID', user.uid);
        window.localStorage.setItem('loggedIn', true);
    } catch (err) {
        const errorCode = err.code;
        const errorMessage = err.message;
        const error = errorCode + " " + errorMessage;
        return error;
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (err) {
        const errorCode = err.code;
        const errorMessage = err.message;
        const error = errorCode + " " + errorMessage;
        return error;
    }
};
const logout = () => {
    window.localStorage.removeItem('globalUID');
    window.localStorage.removeItem('loggedIn');
    signOut(auth);
};

export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};
