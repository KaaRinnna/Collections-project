import React, {forwardRef} from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebase.js";
import {Button} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";
import {Text} from "../../../main.jsx";

const LogoutBtn = forwardRef((props, ref) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate("/");
        }).catch((error) => {
            console.error(error);
        });
    };

    return (
        <>
            <Button ref={ref} className="block w-[82px] mx-auto bg-slate-400 text-slate-900" onClick={handleLogout}>
                <Text tid="log out"/>
            </Button>
        </>
    );
});

export default LogoutBtn;