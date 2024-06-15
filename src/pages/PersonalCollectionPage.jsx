import Header from "../components/Header.jsx";
import PersonalTable from "../components/personalCollection/PersonalCollectionTable.jsx";
import React from "react";
import Footer from "../components/Footer.jsx";

export default function PersonalCollectionPage() {
    return (
        <>
            <Header/>
            <div className="container content relative">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
                    <div
                        className="aspect-[1155/678] w-[24.1875rem] bg-gradient-to-tr from-[#00ffc4] to-[#1000ff] opacity-30"/>
                </div>
                <PersonalTable/>
            </div>
            <Footer/>
        </>
    )
}