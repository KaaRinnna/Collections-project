import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {db} from "../config/firebase.js";
import React, {useEffect, useState} from "react";
import {
    Avatar,
    AvatarIcon,
    Spinner,
    Table,
    TableBody, TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    User
} from "@nextui-org/react";
import {Link} from "react-router-dom";


export default function AllCollections() {
    const collectionRef = collection(db, 'collections');
    const [docsList, setDocsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [columns, setColumns] = useState([]);
    const [userNames, setUserNames] = useState({});

    async function getUserName(userId) {
        const userRef = doc(db, 'users', userId);
        const userData = await getDoc(userRef);
        if (userData.exists()) {
            return userData.data().name;
        }
    }

    useEffect(() => {
        const getDocList = async () => {
            setLoading(true);
            const getDocFunc = await getDocs(collectionRef);
            const getDocsData = await Promise.all(getDocFunc.docs.map(async (doc) => {
                const docData = doc.data();
                const itemsRef = collection(db, 'collections', doc.id, 'items');
                const items = await getDocs(itemsRef);
                const itemsData = items.docs.map((itemDoc) => ({
                    ...itemDoc.data(), id: itemDoc.id,
                }));

                const getColumns = () => {
                    const uniqueColumns = new Set();
                    uniqueColumns.add({"key": "id", "label": "ID"});
                    uniqueColumns.add({"key": "item_name", "label": "Item name"});
                    return Array.from(uniqueColumns);
                }
                setColumns(getColumns());
                return {...docData, id: doc.id, items: itemsData};
            }))
            setDocsList(getDocsData);
            async function fetchUserNames() {
                const names = {};
                for (const doc of docsList) {
                    const name = await getUserName(doc.user_id);
                    names[doc.user_id] = name;
                }
                setUserNames(names);
            }
            fetchUserNames();
            setLoading(false);

        }

        getDocList();


    }, []);

    const renderCell = React.useCallback((item, columnKey) => {
        const cellValue = item[columnKey];
        switch (columnKey) {
            case "item_name" :
                return (
                    <div><Link className="text-violet-500 dark:hover:text-gray-200"
                               to={`/collections/collection/${item.collection}/item/${item.id}`}>{cellValue}</Link>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        loading ? <div className="absolute top-[50%] left-[50%] transform"><Spinner label="Loading..."/></div> :
            <div className="my-12">

                {docsList.map((doc) => (
                    <div key={doc.id}>
                        <User name={<p className="text-gray-800 dark:text-gray-200 my-14">{userNames[doc.user_id]}</p>}
                              avatarProps={<Avatar className="bg-slate-400" size="lg" icon={<AvatarIcon/>}/>}
                        />
                        <div className="rounded-large shadow-small px-4 pb-4 dark:shadow-none">
                            <h3 className="py-4 dark:text-gray-200">Collection name: {doc.collectionName}</h3>
                            <Table>
                                <TableHeader columns={columns}>
                                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                                </TableHeader>
                                <TableBody items={doc.items} emptyContent={"No items to display."}>
                                    {(item) => (
                                        <TableRow key={item.id}>
                                            {(columnKey) => <TableCell className="dark:text-gray-200">{renderCell(item, columnKey)}</TableCell>}
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                ))}
            </div>
    )
}