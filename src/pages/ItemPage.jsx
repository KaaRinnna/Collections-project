import Header from "../components/Header.jsx";
import React from "react";
import Footer from "../components/Footer.jsx";
import ItemTable from "../components/ItemTable.jsx";

export default function ItemPage() {
    return (
        <>
            <Header/>
            <div className="container content peaks">
                <ItemTable/>
            </div>
            <Footer/>
        </>
    )
}