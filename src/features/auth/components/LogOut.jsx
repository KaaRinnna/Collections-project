import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebase.js";
import {Button} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";

const LogoutBtn = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <div>
            <Button onClick={handleLogout}>Log Out</Button>
        </div>
    )
}

export default LogoutBtn;