import React from "react";
import {AvatarIcon} from "@nextui-org/react";
import {NavLink} from "react-router-dom";
import {Avatar} from "@nextui-org/react";

export default function UserAvatar() {
    return (
        <div className="hover:bg-gray-100 p-3 rounded-[50%]">
            <NavLink to="/profile">
                <Avatar
                    className="bg-slate-400"
                    size="sm"
                    icon={<AvatarIcon/> } />
            </NavLink>
        </div>


    )
}