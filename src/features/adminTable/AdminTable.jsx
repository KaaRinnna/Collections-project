import React, {useEffect, useState} from "react";
import {Table, TableHeader, TableColumn, TableBody,
    TableRow, TableCell, DropdownTrigger,
    Dropdown, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import {VerticalDotsIcon} from "../../components/profile/VerticalDots.jsx";
import {columns} from "./adminData.js";
import {db} from "../../config/firebase.js";
import {getDocs, getDoc, collection, doc, updateDoc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";

const getUserList = async () => {
    const usersRef = collection(db, "users");
    try {
        const data = await getDocs(usersRef);
        const usersData = [];
        data.forEach((doc) => {
            usersData.push({ id: doc.id, ...doc.data() });
        });
        return(usersData);
    } catch (error) {
        console.log('Error getting user list', error);
    }
};

export default function AdminTable() {
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserList = async () => {
            try {
                const usersData = await getUserList();
                setUserList(usersData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserList();
    }, []);

    const updateUserList = async () => {
        try {
            const usersData = await getUserList();
            setUserList(usersData);
        } catch (error) {
            console.log('Error updating user list', error);
        }
    }

    const viewUser = async (userId) => {
        try {
            navigate(`/profile/${userId}`);
        } catch (error) {
            console.log('Error viewing user page', error);
        }
    }

    const adminStatusChange = async (userId) => {
        try {
            const userRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const newRole = userDoc.data().role === 'admin' ? 'user' : 'admin';
                await updateDoc(userRef, { role: newRole });
            }
            await updateUserList();
        } catch (error) {
            console.log('Error changing role', error);
        }
    }

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
                            <DropdownMenu className="dark:text-gray-200">
                                <DropdownItem onClick={() => viewUser(user.id)}>
                                    Просмотеть
                                </DropdownItem>
                                <DropdownItem onClick={async() => await adminStatusChange(user.id)}>
                                    Сделать/удалить из админов
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div className="max-w-[700px] mx-auto my-24">
            <h1 className="pt-2 text-center dark:text-gray-200">Пользователи</h1>
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
                            {(columnKey) => <TableCell className="dark:text-gray-200">{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}