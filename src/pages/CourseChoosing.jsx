import Header from "../components/Header.jsx";
import React from "react";
import Footer from "../components/Footer.jsx";
import Choosing from "../features/courseChoosing/Choosing.jsx";

export default function CourseChoosing() {
    return (
        <>
            <Header/>
            <div className="container content relative isolate overflow-hidden">
                <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl" aria-hidden="true">
                    <div
                        className="aspect-[1155/678] w-[58.1875rem] dark:w-[24.1875rem] bg-gradient-to-tr from-[#00ffc4] to-[#1000ff] opacity-30"/>
                </div>
                <Choosing/>

            </div>
            <Footer/>
        </>
    )
}