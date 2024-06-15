import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {LanguageContext} from "../containers/Language.jsx";
import {Text} from "../main.jsx";
import { TypeAnimation } from 'react-type-animation';

export default function Hero() {
    const {dictionary} = useContext(LanguageContext);

    return (

            <div className="relative isolate overflow-hidden bg-cyan-800 dark:bg-slate-950 py-44 max-md:py-10 h-[60vh] max-md:h-[85vh]">

                <div className="mx-auto px-6 lg:px-8 lg:max-w-[1200px] md:max-w-3xl sm:max-w-sm max-sm:max-w-sm">
                    <div className="mx-auto grid grid-cols-1 gap-x-4 gap-y-16 lg:max-w-none md:grid-cols-2">

                        <div
                            className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-1 max-w-[20rem] lg:max-w-[28rem] ">
                            <div className="flex flex-col items-center text-center py-2.5">
                                <h1 className="text-gray-100 max-md:text-[40px]"><Text tid="hero h1" /></h1>
                                <p className="text-gray-300 text-xl pt-2.5 mb-2 max-md:text-[1rem]"><Text tid="various"/></p>
                                <p className="text-gray-300 text-xl max-md:text-[1rem]"><Text tid="hero p"/></p>
                                <Link to="/choosecourse"
                                    className="customBtn bg-indigo-900 py-1.5 px-5 mt-3 text-large rounded-3xl text-gray-200 border-1 border-indigo-900 hover:bg-transparent hover:text-gray-200 hover:no-underline">
                                    <Text tid="start"/>
                                </Link>
                            </div>
                        </div>

                        <div
                            className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-1 lg:pt-2 ">
                            <div className="flex flex-col items-center max-md:items-start content-center justify-center py-2.5 mx-1.5">

                                <TypeAnimation
                                    sequence={[
                                        "Frontend, Backend, UX/UI...",
                                        1000,
                                        "...IT & programming",
                                        1000
                                    ]}
                                    speed={50}
                                    style={{ fontSize: '2em', color: 'white' }}
                                    repeat={Infinity}
                                />
                                <p className="text-gray-300 text-xl text-center max-md:text-start max-md:text-[1rem]"><Text tid="hero bottom-right"/></p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl" aria-hidden="true">
                    <div
                        className="aspect-[1155/678] w-[72.1875rem] dark:w-[24.1875rem] bg-gradient-to-tr from-[#00ffc4] to-[#1000ff] opacity-30"/>
                </div>

            </div>

    )
}