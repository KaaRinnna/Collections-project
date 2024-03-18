import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import UserInfo from "../components/profile/User.jsx";
import ProfileTable from "../components/profile/Collections.jsx";
import CustomColl from "../components/profile/CustomColl.jsx";

export default function Profile() {
    return (
        <>
            <Header/>
            <div >
                <UserInfo/>
                <div className="container">
                    <ProfileTable/>
                    <CustomColl/>
                </div>

            </div>
            <Footer/>
        </>

    )
}