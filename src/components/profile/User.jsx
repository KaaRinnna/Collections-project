import React from "react";
import {User, Avatar, AvatarIcon} from "@nextui-org/react";

export default function UserAvatar() {
    return (
        <div className="flex justify-center flex-wrap items-center">

            <div
                className="flex my-[1.3rem] border-slate-300 border-1 max-w-lg mx-auto py-[1.1rem] rounded-2xl px-[1.5rem]">
                <User
                    name={(
                        <h4 className="mb-0 ">Name</h4>
                    )}
                    description="New collectios lover"
                    avatarProps={(
                        <Avatar
                            size="lg"
                            icon={<AvatarIcon/>}
                        />
                    )}
                />
            </div>

            <div className="mt-[1.3rem] border-slate-300 border-1 max-w-lg mx-auto py-[1.1rem] rounded-2xl px-[1rem]">
                <h4 className="text-start">Profile Information</h4>
                <p className="text-start">Email:</p>
            </div>

        </div>


    )
}