import React from "react";
import {Link} from "react-router-dom";

export default function NotFound() {
    return (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] mx-1.5">
            <div
                className="w-[500px] h-[500px] max-sm:w-[300px] max-sm:h-[300px] flex flex-col items-center content-center justify-center py-2.5 dark:text-gray-200 dark:shadow-none rounded-large shadow-small">
                <h1 className="text-center font-bold text-8xl">404</h1>
                <h2>Page Not Found</h2>
                <p className="py-3">Sorry, we could not find that page.</p>
                <Link to="/" className="bg-rose-200 py-2 px-4 text-gray-800 font-bold hover:bg-rose-400 hover:text-gray-800 hover:no-underline customBtn">Back to Home Page</Link>
            </div>
        </div>

    )
}