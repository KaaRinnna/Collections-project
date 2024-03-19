import {useNavigate, useParams} from "react-router-dom";
import {auth, db} from "../config/firebase.js";
import {useEffect, useState} from "react";
import {doc, getDoc} from "firebase/firestore";

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const {uid} = useParams();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            const userRef = doc(db, 'users', auth.currentUser.uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const userRole = userDoc.data().role;
                if (auth.currentUser.uid === uid || userRole === 'admin') {
                    setIsAuthorized(true);
                } else {
                    navigate("/");
                }
            } else {
                navigate("/login");
            }
            setLoading(false);
        };

        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                checkUser();
            } else {
                navigate("/login");
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [navigate, uid]);

    if (loading) {
        return null; // сделать компонент загрузки
    }
    return isAuthorized ? children : null;
};

export default PrivateRoute;