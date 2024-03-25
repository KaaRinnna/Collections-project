import React, {useEffect, useState} from "react";
import {User, Avatar, AvatarIcon, Spinner} from "@nextui-org/react";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../config/firebase.js";
import {useParams} from "react-router-dom";

export default function UserInfo() {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const {uid} = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserData = async () => {
            const userRef = doc(db, 'users', uid);
            const userData = await getDoc(userRef);
            if (userData.exists()) {
                setUserName(userData.data().name);
                setUserEmail(userData.data().email);
            }
            setLoading(false);
        }
        getUserData();
    }, []);

    return (
        <div className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-28 border-b-1 dark:border-b-gray-700">

            <div className="mx-auto px-6 lg:px-8 lg:max-w-4xl md:max-w-3xl sm:max-w-sm max-sm:max-w-sm">
                <div className="mx-auto grid grid-cols-1 gap-x-4 gap-y-16 lg:max-w-none md:grid-cols-2">
                    <div
                        className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-1 max-w-[20rem] lg:max-w-[20rem] border-gray-400 dark:border-gray-500 border-1 rounded-3xl">
                        <div className="flex flex-col items-center content-center justify-center py-2.5">
                            {userName && loading ? <div className="absolute top-[50%] left-[50%] transform"><Spinner label="Loading..."/></div> :(
                                <User
                                    name={(
                                        <h4 className="text-gray-800 dark:text-gray-200 mb-0">{userName}</h4>
                                    )}
                                    description={(<p className="mb-0 text-gray-500">New collection's lover</p>)}
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

                    <div
                        className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-1 lg:pt-2 border-gray-400 dark:border-gray-500 border-1 rounded-3xl">
                        {userEmail && loading ? <div className="absolute top-[50%] left-[50%] transform"><Spinner label="Loading..."/></div> :(
                            <div className="flex flex-col items-center content-center justify-center py-2.5 mx-1.5">
                                <h4 className="text-start text-gray-800 dark:text-gray-200 mb-0">Profile
                                    Information</h4>
                                <p className="text-start text-gray-500 mb-0">Email: {userEmail}</p>
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