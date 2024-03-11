import React, {useEffect, useState} from "react";
import {User, Avatar, AvatarIcon} from "@nextui-org/react";
import {auth} from "../../config/firebase.js";

export default function UserInfo() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            console.log(user)
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32">

            <div className="mx-auto px-6 lg:px-8 lg:max-w-4xl md:max-w-3xl sm:max-w-sm max-sm:max-w-sm">
                <div className="mx-auto grid grid-cols-1 gap-x-4 gap-y-16 lg:max-w-none md:grid-cols-2">

                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-1 max-w-[20rem] lg:max-w-[20rem] border-gray-400 border-1 rounded-3xl">
                        <div className="flex flex-col items-center content-center justify-center py-2.5">
                            {user && (
                                <User
                                    name={(
                                        <h4 className=" text-gray-800 mb-0">{user.displayName}</h4>
                                    )}
                                    description={(<p className="mb-0 text-gray-600" >New collections lover</p>)}
                                    avatarProps={(
                                        <Avatar
                                            className="bg-slate-400"
                                            size="lg"
                                            icon={<AvatarIcon/>}
                                        />
                                    )}
                                />
                            )}

                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-1 lg:pt-2 border-gray-400 border-1 rounded-3xl">
                        {user && (
                            <div className="flex flex-col items-center content-center justify-center py-2.5 mx-1.5">
                                <h4 className="text-start text-gray-800 mb-0">Profile Information</h4>
                                <p className="text-start text-gray-600 mb-0">Email: {user.email}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
                <div
                    className="aspect-[1155/678] w-[24.1875rem] bg-gradient-to-tr from-[#00ffc4] to-[#1000ff] opacity-30"/>
            </div>

        </div>
    )
}