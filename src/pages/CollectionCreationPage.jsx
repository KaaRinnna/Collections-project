import React from "react";
import CollectionCreation from "../features/collectionsCreate/CollectionCreation.jsx";
import Header from "../components/Header.jsx";
import ItemForm from "../features/itemsCreate/ItemForm.jsx";
import Footer from "../components/Footer.jsx";

export default function CollectionCreationPage() {
    return (
        <div>
            <Header/>
            <div className="container content">
                <CollectionCreation/>
            </div>
            <Footer/>
        </div>
    )
}