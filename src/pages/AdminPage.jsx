import React, {useEffect, useState} from "react";
import AdminTable from "../features/adminTable/AdminTable.jsx";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../config/firebase.js";
import {getDoc, doc} from "firebase/firestore";
import {Navigate} from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function AdminPage() {
    const [user] = useAuthState(auth);
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        const checkAdminRole = async () => {
            if (user && user.uid) {
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists() && userDoc.data().role === 'admin') {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            }
        };
        checkAdminRole();
    }, [user]);

    if (isAdmin === null) {
        return null;
    }

    return (
        <div>
            <Header/>
            {isAdmin ? (
                <div className="content container peaks">
                    <AdminTable/>
                </div>
            ) : (
                <Navigate to="/"/>
            )}
            <Footer/>
        </div>
    )
}