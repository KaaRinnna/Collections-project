import React, {useEffect, useState} from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@nextui-org/react";
import {columns} from "./data.js";
import {PlusIcon} from "./PlusIcon.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../config/firebase.js";

export default function ProfileTable() {
    const [docsList, setDocsList] = useState([]);
    const {uid} = useParams();
    const navigate = useNavigate();

    const getDocsList = async () => {
        const collRef = collection(db, 'collections');
        const q = query(collRef, where("user_id", "==", uid));
        try {
            const collDocs = await getDocs(q);
            const docsData = [];
            collDocs.forEach((doc) => {
                docsData.push({id: doc.id, ...doc.data()});
            });
            return(docsData);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const fetchDocsList = async () => {
            if (uid) {
                try {
                    const docsData = await getDocsList();
                    setDocsList(docsData);
                } catch (err) {
                    console.error(err);
                }
            }
        }
        fetchDocsList();
    }, [uid]);

    const onHandleAdd = () => {
        navigate("/collections/create-collection");
    }

    const renderCell = React.useCallback((item, columnKey) => {
        const cellValue = item[columnKey];
        switch (columnKey) {
            case "collectionName" :
                return (
                    <div className="text-bold text-large capitalize">
                        <Link className="text-violet-500" to={`/collections/collection/${item.id}`}>{cellValue}</Link>
                    </div>
                );
            case "description":
                return (
                    <div className="text-medium text-default-500">
                        {cellValue}
                    </div>
                );
            case "topic":
                return (
                    <div className="text-medium text-default-500">
                        {cellValue}
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div className="max-w-[700px] mx-auto mt-6 mb-24">
            <h1 className="pt-4 text-center dark:text-gray-200">My collections</h1>
            <Table className="max-w-[700px] mx-auto my-10">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}
                                     width={column.uid === "actions" ? "1/4" : "auto"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={docsList} emptyContent={"No collection to display."}>
                    {(item) => (
                        <TableRow key={item.id} >
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Button
                onClick={onHandleAdd}
                className="text-gray-200"
                endContent={<PlusIcon />}
                size="md"
                color="primary"
            >
                Add new collection
            </Button>
        </div>
    );
}
