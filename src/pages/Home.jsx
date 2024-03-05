import React from "react";
import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import Footer from "../components/Footer.jsx";
import Skeleton from "../components/HomeSkeleton.jsx";

export default function Home() {

    return (
        <>
            <Header/>
            <Hero/>
            <Skeleton/>
            <Skeleton/>
            <Footer/>
        </>
    )
}