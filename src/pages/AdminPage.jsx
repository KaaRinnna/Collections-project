import React, {useEffect, useState} from "react";
import AdminTable from "../components/AdminTable.jsx";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../config/firebase.js";
import {getDoc, doc} from "firebase/firestore";
import {Navigate} from "react-router-dom";

export default function AdminPage() {
    const [user] = useAuthState(auth);
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        const checkAdminRole = async () => {
            if (user && user.uid) {
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
                console.log(userDoc.data().role)

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
            {isAdmin ? (
                <AdminTable/>
            ) : (
                <Navigate to="/"/>
            )}
        </div>
    )
}