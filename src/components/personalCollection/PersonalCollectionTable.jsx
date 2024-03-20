import React, {useEffect} from "react";
import {db} from "../../config/firebase.js";
import {doc, getDoc, collection, getDocs} from "firebase/firestore";
import {useParams} from "react-router-dom";
export default function PersonalTable() {
    const {id} = useParams();
    const docRef = doc(db, 'collections', id);
    const [tableList, setTableList] = React.useState([]);
    const itemsRef = collection(db, 'collections', id, 'items');
    const [itemList, setItemList] = React.useState([]);

    useEffect(() => {
        const getCollectionList = async () => {
            try {
                const data = await getDoc(docRef);
                const collectionData = {
                    ...data.data(), id: data.id,
                };
                const items = await getDocs(itemsRef);
                const itemsData = items.docs.map((doc) => ({
                    ...doc.data(), id: doc.id,
                }));
                setTableList(collectionData);
                setItemList(itemsData);
            } catch (err) {
                console.error(err);
            }
        };

        getCollectionList();
    }, []);

    return (
        <div className="containt-table">
            <h1>{tableList.collectionName} collection page</h1>
            <table className="striped-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>

                    <th>{tableList.custom_string1_name}</th>

                    <th>{tableList.custom_number1_name}</th>

                    <th>{tableList.custom_date1_name}</th>

                    <th>{tableList.custom_text1_name}</th>

                    <th>{tableList.custom_checkbox1_name}</th>
                </tr>
                </thead>
                <tbody>
                {itemList.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.item_name}</td>

                        <td>{item.custom_string1_name}</td>

                        <td>{item.custom_number1_name}</td>

                        <td>{item.custom_date1_name.toDate().toString()}</td>

                        <td>{item.custom_text1_name}</td>

                        <td>{item.custom_checkbox1_name.toString()}</td>
                    </tr>
                ))}

                </tbody>
            </table>
        </div>
    )

}