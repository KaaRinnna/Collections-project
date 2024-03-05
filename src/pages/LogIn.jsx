import React from "react";
import Footer from "../components/Footer.jsx";
import LoginForm from "../features/auth/components/LoginForm.jsx";

export default function LogIn() {
    return (
        <>
            <div className="min-h-[85vh] flex justify-center items-center container">
                <LoginForm/>
            </div>
            <Footer/>
        </>

    )
}