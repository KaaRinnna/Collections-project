import Header from "../components/Header.jsx";
import PersonalTable from "../components/personalCollection/PersonalCollectionTable.jsx";

export default function CollectionPage() {
    return (
        <>
            <Header/>
            <div className="container">
                <PersonalTable/>
            </div>
        </>
    )
}