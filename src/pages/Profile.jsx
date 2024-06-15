import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import UserInfo from "../components/profile/User.jsx";
import ProfileTable from "../components/profile/ProfileCollection.jsx";
import ProfileCourse from "../components/profile/ProfileCourse.jsx";

export default function Profile() {
    return (
        <>
            <Header/>
            <div >
                <UserInfo/>
                <div className="container last-peaks">
                    <ProfileCourse/>
                    <ProfileTable/>
                </div>
            </div>
            <Footer/>
        </>

    )
}