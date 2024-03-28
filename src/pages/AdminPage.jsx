import React from "react";
import AdminTable from "../features/adminTable/AdminTable.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function AdminPage() {
    return (
        <div>
            <Header/>
                <div className="content container">
                    <AdminTable/>
                </div>
            <Footer/>
        </div>
    )
}