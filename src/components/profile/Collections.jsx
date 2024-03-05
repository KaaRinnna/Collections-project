import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import {columns, users} from "../../features/collectionsProfile/data.js";
import {VerticalDotsIcon} from "../../features/collectionsProfile/VerticalDots.jsx";
import {PlusIcon} from "./PlusIcon.jsx";

const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

export default function ProfileTable() {
    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <p className="text-start">{user.name}</p>
                );
            case "description":
                return (
                    <p className="text-bold text-sm capitalize text-default-400 text-start">{user.team}</p>
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
            <h2 className="pt-2 text-start">My collections</h2>
            <Table aria-label="Example table with custom cells" className="max-w-[700px] mx-auto my-10">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"} width={column.uid === "actions" ? "1/4" : "auto"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={users}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Button color="primary" endContent={<PlusIcon />} className="justify-end">
                Add New
            </Button>
        </div>

    );
}
