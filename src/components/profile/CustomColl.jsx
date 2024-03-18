import React, {useEffect, useState} from "react";
import {db} from "../../config/firebase.js";
import {getDocs, collection} from "firebase/firestore";
export default function CustomColl() {
    const [collectionList, setCollectionList] = useState([]);
    const collectionRef = collection(db, 'collections');

    useEffect(() => {
        const getCollectionList = async () => {
            try {
                const data = await getDocs(collectionRef);
                const collectionData = data.docs.map((doc) => ({
                    ...doc.data(), id: doc.id,
                }));
                setCollectionList(collectionData);
            } catch (err) {
                console.error(err);
            }
        };

        getCollectionList();
    }, []);

    return (
        <div className="containt-table">
            <table className="striped-table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>String1</th>
                    <th>String2</th>
                    <th>Checkbox</th>
                </tr>
                </thead>

                <tbody>
                {collectionList.map((coll) => (
                    <tr key={coll.id}>
                        <td>{coll.id}</td>
                        <td>{coll.name}</td>
                        <td>{coll.description}</td>
                        <td>{coll.category_id}</td>
                        <td>{coll.custom_string1_name}</td>
                        <td>{coll.custom_string2_name}</td>
                        <td>{coll.custom_checkbox1_name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )

}