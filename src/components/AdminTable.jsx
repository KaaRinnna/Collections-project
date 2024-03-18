import React, {useEffect, useState} from "react";
import {Table, TableHeader, TableColumn, TableBody,
    TableRow, TableCell, DropdownTrigger,
    Dropdown, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import {VerticalDotsIcon} from "./profile/VerticalDots.jsx";
import {columns} from "../features/adminTable/adminData.js";
import {db, auth} from "../config/firebase.js";
import {getDocs, getDoc, collection, doc, updateDoc, deleteDoc} from "firebase/firestore";
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
                            <DropdownMenu>
                                <DropdownItem onClick={() => viewUser(user.id)}>
                                    View
                                </DropdownItem>
                                <DropdownItem>Block/unblock</DropdownItem>
                                <DropdownItem onClick={async() => await adminStatusChange(user.id)}>
                                    Make/unmake an admin
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const deleteUser = function () {
        const uid = '47tMMwxM01gaq7xk87599Kchftd2';

        fetch('/deleteUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({uid})
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка удаления пользователя front');
                }
                return response.text();
            })
            .then(data => {
                console.log(data);
                alert('Пользователь успешно удален front');
            })
            .catch(error => {
                console.error(error);
                alert('Ошибка удаления пользователя front');
            });
    }

    return (
        <div className="max-w-[700px] mx-auto my-12">
            <h2 className="pt-2 text-start">Users</h2>
            <Button onClick={deleteUser}>Delete</Button>
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