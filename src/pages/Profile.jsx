import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import UserAvatar from "../components/profile/User.jsx";
export default function Profile() {
    return (
        <>
            <Header/>
            <div className="min-h-[85vh] container">
                <UserAvatar/>
            </div>
            <Footer/>
        </>

    )
}