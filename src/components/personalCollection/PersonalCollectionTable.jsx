import React, {useEffect, useState} from "react";
import {db} from "../../config/firebase.js";
import {doc, getDoc, collection, getDocs} from "firebase/firestore";
import {Link, useNavigate, useParams} from "react-router-dom";
import {
    Table,
    TableBody,
    TableColumn,
    TableHeader,
    TableRow,
    TableCell, Spinner, Button,
} from "@nextui-org/react";
import {PlusIcon} from "../profile/PlusIcon.jsx";

export default function PersonalTable() {
    const {id} = useParams();
    const docRef = doc(db, 'collections', id);
    const itemsRef = collection(db, 'collections', id, 'items');
    const [tableList, setTableList] = useState([]);
    const [itemList, setItemList] = React.useState([]);
    const [loading, setLoading] = useState(true);
    const [columns, setColumns] = useState([]);
    const navigate = useNavigate();
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["2"]));

    useEffect(() => {
        const getCollectionList = async () => {
            try {
                setLoading(true);
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

                const getColumns = () => {
                    const uniqueColumns = new Set();
                    uniqueColumns.add({"key": "id", "label": "ID"});
                    uniqueColumns.add({"key": "item_name", "label": "Item name"});
                    for (let key in collectionData) {
                        if ((key.startsWith("custom_string") || key.startsWith("custom_date")) && key.endsWith("_state") && collectionData[key]) {
                            let name_key = key.replace("_state", "_name");
                            uniqueColumns.add({"key": name_key, "label": collectionData[name_key]});
                        }
                    }
                    return Array.from(uniqueColumns);
                }
                setColumns(getColumns());
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        };
        getCollectionList();

    }, []);

    const onHandleAdd = () => {
        navigate("/collections/create-item");
    }

    const renderCell = React.useCallback((item, columnKey) => {
        const cellValue = item[columnKey];
        if (columnKey === "item_name") {
            return (
                <div><Link className="text-violet-500 dark:hover:text-gray-200" to={`/collections/collection/${id}/item/${item.id}`}>{cellValue}</Link></div>
            )
        } else if (columnKey.startsWith("custom_date")) {
            return (
                <div className="text-bold text-large capitalize">
                    {cellValue.toDate().toString()}
                </div>
            );
        } else {
            return cellValue;
        }
    }, []);

    return (
        loading ? <div className="absolute top-[50%] left-[50%] transform"><Spinner label="Loading..." /></div> :
            <div className="max-w-[1200px] mx-auto mt-12 mb-24">
                <h1 className="text-center dark:text-gray-200">{tableList.collectionName} collection page</h1>
                <Table className="max-w-[1200px] mx-auto my-10 dark:text-gray-200">
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={itemList} emptyContent={"No items to display."}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <Button
                    onClick={onHandleAdd}
                    className="text-background dark:text-gray-200"
                    endContent={<PlusIcon />}
                    size="md"
                    color="primary"
                >
                    Add new item
                </Button>
            </div>


    )
}