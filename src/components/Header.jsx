import React, {useEffect, useState} from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    NavbarContent,
    NavbarItem,
    Button,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import {auth} from "../config/firebase.js";
import UserAvatar from "./profile/UserAvatar.jsx";
import LogoutBtn from "../features/auth/components/LogOutBtn.jsx";

export default function Header() {
    const [user, setUser] = useState(null);

    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    return (
        <Navbar disableAnimation isBordered>

            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarContent className="sm:hidden pr-3" justify="center">
                <NavbarBrand>
                    <Link to="/" className="text-violet-950">Cll.byK</Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4 mb-0" justify="center">
                <NavbarBrand>
                    <Link to="/" className="text-violet-950">Cll.byK</Link>
                </NavbarBrand>
                <NavbarItem isActive>
                    <Link to="/" aria-current="page" color="warning">
                        Customers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link  to="/" color="foreground">
                        Integrations
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end" className="mb-0">
                {user ? (
                    <><UserAvatar/>
                        <LogoutBtn/>
                    </>
                ) : (
                    <>
                        <NavbarItem className="hidden md:flex">
                            <Link to="/login">Login</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link} color="warning" to="/signup" variant="flat">
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>


            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            color={
                                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            to="/"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>

        </Navbar>
    );
}
