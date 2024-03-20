import Header from "../components/Header.jsx";
import PersonalTable from "../components/personalCollection/PersonalCollectionTable.jsx";
import {PlusIcon} from "../components/profile/PlusIcon.jsx";
import {Link} from "react-router-dom";
import React from "react";

export default function CollectionPage() {
    return (
        <>
            <Header/>
            <div className="container">
                <PersonalTable/>
                <Link to="/collections/create-collection" color="primary" endContent={<PlusIcon />} className="justify-end" >
                    Add New
                </Link>
            </div>
        </>
    )
}