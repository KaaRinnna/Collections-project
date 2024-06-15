import {Text} from "../../main.jsx";
import {Autocomplete, AutocompleteItem, Button, Card, CardHeader} from "@nextui-org/react";
import React, {useContext, useState} from "react";
import {LanguageContext} from "../../containers/Language.jsx";
import {useForm} from "react-hook-form";
import {doc, updateDoc} from "firebase/firestore";
import {auth, db} from "../../config/firebase.js";
import {useNavigate} from "react-router-dom";
import CardFrontend from "./CardFrontend.jsx";
import CardBackend from "./CardBackend.jsx";
import CardDesign from "./CardDesign.jsx";

export default function Choosing() {
    const {dictionary} = useContext(LanguageContext);
    const navigate = useNavigate();
    const [selectedCourse, setSelectedCourse] = useState(null);

    const {register, handleSubmit, unregister
    } = useForm()

    const courseTypes = [
        {label: "Front-end", value: "frontend"},
        {label: "Back-end", value: "backend"},
        {label: "UX/UI", value: "ux"},
    ];

    async function onFormSubmit() {
        const updateProfile = {
            course: selectedCourse
        }
        const userRef = doc(db, "users", auth.currentUser.uid);
        try {
            await updateDoc(userRef, {
                course: selectedCourse
            })
            navigate(`/profile/${auth.currentUser.uid}`);
        } catch (err) {
            console.error(err)
        }


    }

    function onSelectionChange(id) {
        setSelectedCourse(id);
    }

    return (
        <div className="max-w-[1040px] w-full mx-auto my-12">
            <div className="min-w-0">
                <h1 className="dark:text-gray-100 text-center"><Text tid="courses"/></h1>
                <form onSubmit={handleSubmit(onFormSubmit)}
                      className="p-3 h-auto subpixel-antialiased break-words overflow-y-auto flex-col w-full items-center flex-auto flex relative">
                    <Autocomplete
                        isRequired
                        label={dictionary["select course"]}
                        className="max-w-xs my-2.5"
                        variant="faded"
                        size="lg"
                        onSelectionChange={onSelectionChange}
                    >
                        {courseTypes.map((field) => (
                            <AutocompleteItem className="dark:text-gray-100" key={field.value} value={field.value}>
                                {field.label}
                            </AutocompleteItem>
                        ))}
                    </Autocomplete>

                    <Button className="my-3 rounded-3xl text-large" type="submit" color="primary">
                        <Text tid="submit"/>
                    </Button>
                </form>

                <div>
                    <CardFrontend/>
                    <CardBackend/>
                    <CardDesign/>
                </div>
            </div>
        </div>
    )
}