import {Checkbox, Spinner} from "@nextui-org/react";
import {useParams} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../config/firebase.js";
import React, {useEffect, useState} from "react";
import {date} from "yup";

export default function ItemTable() {
    const {id, itemId} = useParams();
    const [collectionDoc, setCollectionDoc] = useState({});
    const [itemDoc, setItemDoc] = useState({});
    const [loading, setLoading] = useState(true);

    const collectionDocRef = doc(db, 'collections', id);
    const itemDocRef = doc(db, 'collections', id, 'items', itemId);

    useEffect(() => {
        const getCollectionDocData = async () => {
            setLoading(true);
            const getCollectionDoc = await getDoc(collectionDocRef);
            const collectionDocData = {
                ...getCollectionDoc.data(),
            }
            setCollectionDoc(collectionDocData);
            setLoading(false);
        }

        const getItemData = async () => {
            const getItem = await getDoc(itemDocRef);
            const itemData = {
                ...getItem.data(),
            }
            setItemDoc(itemData);
        }

        getCollectionDocData();
        getItemData();
    }, []);

    const CheckboxWithLabel = ({label, isDisabled, defaultSelected}) => (
        <div className="py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
            <dt className="dark:text-gray-200 font-normal">{label}</dt>
            <Checkbox isDisabled={isDisabled} defaultSelected={defaultSelected}/>
        </div>
    )


    return (
        loading ? <div className="absolute top-[50%] left-[50%] transform"><Spinner label="Loading..."/></div> :
            <div
                className="max-w-[1000px] mx-auto my-24 py-10 px-5 dark:bg-gray-900 rounded-large shadow-small dark:shadow-none">
                <div className="dark:text-gray-200 pb-4">
                    <h1>{collectionDoc.collectionName} Item information</h1>
                    <p>Details</p>
                </div>
                <div>
                    <dl className="divide-y divide-gray-700 text-lg">
                        {Object.keys(collectionDoc).map((key) => {
                            if (key.startsWith("custom_") && key.endsWith("_name")) {
                                const stateKey = key.replace("_name", "_state");
                                const checkboxKey = key.includes("checkbox");
                                const dateKey = key.includes("date");
                                if (collectionDoc[stateKey] === true) {
                                    return (
                                        checkboxKey ?
                                            <CheckboxWithLabel
                                                label={collectionDoc[key]}
                                                isDisabled
                                                defaultSelected={itemDoc[key] === true}
                                            /> :
                                            dateKey ?
                                                <div className="py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0" key={key}>
                                                    <dt className="dark:text-gray-200 font-normal">{collectionDoc[key]}</dt>
                                                    <dd className="dark:text-gray-400">{itemDoc[key] && itemDoc[key].toDate().toString()}</dd>
                                                </div> :
                                                <div className="py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0" key={key}>
                                                    <dt className="dark:text-gray-200 font-normal">{collectionDoc[key]}</dt>
                                                    <dd className="dark:text-gray-400">{itemDoc[key]}</dd>
                                                </div>
                                    )
                                }
                            }
                        })}
                    </dl>
                </div>
            </div>

    )
}