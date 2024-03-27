import Header from "../components/Header.jsx";
import PersonalTable from "../components/personalCollection/PersonalCollectionTable.jsx";
import React from "react";
import Footer from "../components/Footer.jsx";

export default function PersonalCollectionPage() {
    return (
        <>
            <Header/>
            <div className="container content">
                <PersonalTable/>
            </div>
            <Footer/>
        </>
    )
}