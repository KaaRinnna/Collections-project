import React, {useEffect} from "react";
import {db} from "../../config/firebase.js";
import {doc, getDoc, collection, getDocs} from "firebase/firestore";
export default function PersonalTable() {
    const docRef = doc(db, 'collections', 'xGpp9Ui4RbHdMiVCOQBU');
    const [tableList, setTableList] = React.useState([]);
    const itemsRef = collection(db, 'collections', 'xGpp9Ui4RbHdMiVCOQBU', 'items');
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
                    <th>{tableList.custom_string2_name}</th>
                    <th>{tableList.custom_string3_name}</th>

                    <th>{tableList.custom_int1_name}</th>

                </tr>
                </thead>
                <tbody>
                {itemList.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.item_name}</td>

                        <td>{item.custom_string1_name}</td>
                        <td>{item.custom_string2_name}</td>
                        <td>{item.custom_string3_name}</td>

                        <td>{item.custom_int1_name}</td>
                    </tr>
                ))}

                </tbody>
            </table>
        </div>
    )

}