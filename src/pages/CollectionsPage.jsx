import Header from "../components/Header.jsx";
import AllCollections from "../components/AllCollections.jsx";
import Footer from "../components/Footer.jsx";

export default function CollectionsPage() {
    return (
        <>
            <Header/>
            <div className="container content">
                <AllCollections/>
            </div>
            <Footer/>
        </>
    )
}