import React from "react";
import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import Footer from "../components/Footer.jsx";
import LastCreatedItem from "../components/LastCreatedItem.jsx";

export default function Home() {
    return (
        <>
            <Header/>
            <Hero/>
            <div className="container">
                <LastCreatedItem/>
            </div>
            <Footer/>
        </>
    )
}