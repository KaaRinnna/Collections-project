import Header from "../components/Header.jsx";
import ItemForm from "../features/itemsCreate/ItemForm.jsx";
import Footer from "../components/Footer.jsx";
import React from "react";

export default function ItemCreationPage() {
    return (
        <div>
            <Header/>
            <div className="container content">
                <ItemForm/>
            </div>
            <Footer/>
        </div>
    )
}