import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CoursesDescription from "../features/courses/CoursesDescription.jsx";

export default function CoursePage() {
    return (
        <>
            <Header/>
            <div className="content">
                <CoursesDescription/>
            </div>
            <Footer/>
        </>
    )
}