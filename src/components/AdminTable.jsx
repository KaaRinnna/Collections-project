import React, {useEffect, useState} from "react";
import {Table, TableHeader, TableColumn, TableBody,
    TableRow, TableCell, DropdownTrigger,
    Dropdown, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import {VerticalDotsIcon} from "./profile/VerticalDots.jsx";
import {columns} from "../features/adminTable/adminData.js";
import {db} from "../config/firebase.js";
import {getDocs, collection} from "firebase/firestore";

export default function AdminTable() {
    const [userList, setUserList] = useState([]);
    const usersRef = collection(db, "users");

    useEffect(() => {
        const getUserList = async () => {
            try {
                const data = await getDocs(usersRef);
                const usersData = [];
                data.forEach((doc) => {
                    usersData.push({ id: doc.id, ...doc.data() });
                });
                setUserList(usersData);
            } catch (error) {
                console.log(error);
            }
        }
        getUserList();
    }, []);

    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <p className="text-start">{user.name}</p>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <VerticalDotsIcon className="text-default-300" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem>View</DropdownItem>
                                <DropdownItem>Edit</DropdownItem>
                                <DropdownItem>Delete</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div className="max-w-[700px] mx-auto my-12">
            <h2 className="pt-2 text-start">Users</h2>

            <Table aria-label="Table with authenticated users" className="max-w-[700px] mx-auto my-10">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}
                                     width={column.uid === "actions" ? "1/4" : "auto"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={userList}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

        </div>
    );
}