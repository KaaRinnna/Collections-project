import React from "react";
import Footer from "../components/Footer.jsx";
import RegForm from "../features/auth/RegForm.jsx";

export default function SignUp() {
    return (
        <>
            <div className="min-h-[85vh] flex justify-center items-center container">
                <RegForm/>
            </div>
            <Footer/>
        </>

    )
}