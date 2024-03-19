import {useEffect, useState} from "react";
import {auth} from "../config/firebase.js";
import {useNavigate} from "react-router-dom";

const LoginRoute = ({children}) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (!user) {
                navigate("/login");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [navigate]);

    if (loading) {
        return null;
    }

    return children;
}

export default LoginRoute;