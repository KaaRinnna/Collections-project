import React from "react";
import {AvatarIcon} from "@nextui-org/react";
import {Avatar} from "@nextui-org/react";

export default function UserAvatar() {
    return (
        <div className="hover:bg-gray-200 p-2.5 rounded-[50%]">
                <Avatar
                    className="bg-slate-400"
                    size="sm"
                    icon={<AvatarIcon/> } />
        </div>


    )
}