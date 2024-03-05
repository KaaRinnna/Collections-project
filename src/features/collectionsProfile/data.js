import React from "react";
const columns = [
    {name: "NAME", uid: "name"},
    {name: "DESCRIPTION", uid: "description"},
    {name: "ACTIONS", uid: "actions"},
];

const users = [
    {
        id: 1,
        name: "Tony Reichert",
        team: "Management",
        email: "tony.reichert@example.com",
    },
    {
        id: 2,
        name: "Zoey Lang",
        team: "Development",
        email: "zoey.lang@example.com",
    },
    {
        id: 3,
        name: "Jane Fisher",
        team: "Development",
        email: "jane.fisher@example.com",
    },
    {
        id: 4,
        name: "William Howard",
        team: "Marketing",
        email: "william.howard@example.com",
    },
    {
        id: 5,
        name: "Kristen Copper",
        team: "Sales",
        email: "kristen.cooper@example.com",
    },
];

export {columns, users};
