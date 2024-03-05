import React from "react";
import {Link} from "react-router-dom";



export default function Hero() {
    return (
        <div className="relative isolate overflow-hidden bg-cyan-800 py-24 max-md:py-14 h-[50vh] max-md:h-[85vh]">

            <div className="mx-auto px-6 lg:px-8 lg:max-w-4xl md:max-w-3xl sm:max-w-sm max-sm:max-w-sm">
                <div className="mx-auto grid grid-cols-1 gap-x-4 gap-y-16 lg:max-w-none md:grid-cols-2">

                    <div
                        className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-1 max-w-[20rem] lg:max-w-[20rem] ">
                        <div className="flex flex-col items-start content-center justify-center py-2.5">
                            <h1 className="text-gray-100 text-start">Create your own collection</h1>
                            <p className="text-gray-300 pt-2.5 mb-0">Add various items to your collections.</p>
                            <p className="text-gray-300">Edit, delete, add, inspect.</p>
                            <Link to="/profile"
                                className="bg-indigo-900 py-2 px-4 mt-2.5 rounded-3xl text-gray-200 border-1 border-indigo-900 hover:bg-transparent hover:text-gray-200 hover:no-underline">
                                Get Started!
                            </Link>

                        </div>
                    </div>

                    <div
                        className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-1 lg:pt-2 ">
                        <div className="flex flex-col items-center max-md:items-start content-center justify-center py-2.5 mx-1.5">
                            <h3 className="text-gray-100 max-md:text-start">Books, movies, marks, coins...</h3>
                            <p className="text-gray-300">...and anything you like!</p>
                            <p className="text-gray-300 max-md:text-start">Browse other authors` collections. Comment and like items!</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
                <div
                    className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"/>
            </div>

        </div>
    )
}