import React, {useEffect, useState, useRef} from "react";
import { Link } from "react-router-dom";
import {auth, db} from "../config/firebase.js";
import UserAvatar from "./profile/UserAvatar.jsx";
import LogoutBtn from "../features/auth/components/LogOutBtn.jsx";

import algoliasearch from "algoliasearch";
import {InstantSearch, Hits, Highlight, connectSearchBox} from "react-instantsearch-dom";

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {Button} from "@nextui-org/react";
import ThemeToggler from "../features/theme/ThemeToggler.jsx";
import LanguageSelector from "./LanguageSelector.jsx";
import {Text} from "../main.jsx";
import {doc, getDoc} from "firebase/firestore";

const searchClient = algoliasearch(
    import.meta.env.VITE_ALGOLIA_APP_ID,
    import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY,
)

function Hit ({hit}) {
    return (
        <div className="text-gray-200">
            <p><a className="text-gray-200" href={`/collections/collection/${hit.objectID}`}>Collection: <Highlight hit={hit} attribute="collectionName"/></a> </p>
            <p>description: {hit.description}</p>
        </div>
    );
}

const CustomSearchBox = connectSearchBox(({ currentRefinement, refine }) => {
    return (
        <input
            type="search"
            className="ais-SearchBox-input"
            placeholder="Search..."
            value={currentRefinement}
            onChange={event => refine(event.currentTarget.value)}
        />
    );
});

const navigation = [
    { name: <Text tid="header home"/>, to: '/'},
    { name: <Text tid="header collections"/>, to: '/collections'},
    { name: <Text tid="courses"/>, to: "/courses"}
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {
    const btnRef = useRef();
    const [user, setUser] = useState(null);

    const [searchItem, setSearchItem] = useState('');
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const getRole = async (userId) => {
        const usersRef = doc(db, 'users', userId);
        const getUsersDoc = await getDoc(usersRef);
        if (getUsersDoc.exists()) {
            return getUsersDoc.data().role;
        }
    }

    useEffect(() => {
        async function fetchUserRole() {
            if (user) {
                const role = await getRole(user.uid);
                setUserRole(role);
            }

        }
        fetchUserRole();
    }, [user]);



    return (
        <Disclosure as="nav" className="bg-background/70 z-20 w-full sticky top-0 inset-x-0 border-b dark:border-gray-900 border-divider backdrop-blur-lg backdrop-saturate-150">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center md:hidden">

                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only"></span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>

                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center"/>
                                <div className="hidden sm:ml-6 md:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.to}
                                                className={classNames(
                                                    ' customBtn headerLinks text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700',
                                                    'rounded-3xl px-3 py-2 text-sm font-medium dark:text-gray-300'
                                                )}

                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                        <LanguageSelector/>

                                    </div>
                                </div>
                            </div>

                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <InstantSearch searchClient={searchClient} indexName="collections" onSearchStateChange={({query}) => setSearchItem(query)}>

                                    <CustomSearchBox/>
                                    {searchItem && <Hits hitComponent={Hit} className="absolute top-[80%] z-30 bg-gray-700 rounded-2xl py-2 px-4"/>}
                                </InstantSearch>
                                <ThemeToggler/>
                                {user ? (
                                    <Menu as="div" className="relative">
                                        <div>
                                            <Menu.Button className="relative flex rounded-full text-sm focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <UserAvatar/>
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-slate-500 dark:bg-gray-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item className="mb-2">
                                                    {({ active }) => (
                                                        <Link
                                                            to={`/profile/${user.uid}`}
                                                            className={classNames(active ? 'bg-gray-600 customBtn' : '', 'hover:no-underline hover:text-cyan-500 text-gray-200 block px-4 py-2 text-medium text-center')}
                                                        >
                                                            <Text tid="profile"/>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {userRole === 'admin' ? (
                                                        <Link to="/admin" className='hover:no-underline hover:bg-gray-600 mb-1 customBtn hover:text-cyan-500 text-gray-200 block px-4 py-2 text-sm text-center'>
                                                            Admin
                                                        </Link>
                                                    ) : (
                                                        <div></div>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <LogoutBtn ref={btnRef} />
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                ) : (
                                    <>
                                        <Button as={Link} to="/login" variant="flat" className="relative rounded-full bg-gray-800 p-1 mx-2 hover:no-underline hover:bg-gray-700 text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            Log In
                                        </Button>
                                        <Button as={Link} to="/signup" variant="flat" className="relative rounded-full bg-gray-300 p-1 hover:no-underline text-gray-800 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            Sign Up
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="md:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as={Link}
                                    to={item.to}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-400 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
)
}
