"use client";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
    const { data: session } = useSession();
    const [showdropdown, setShowdropdown] = useState(false);

    console.log(session); // Log the session object to the console

    return (
        <nav className="bg-black text-white flex justify-between p-3 md:h-16 flex-col md:flex-row items-center montserrat-regular">
            <div className="logo font-bold">SupportSphere</div>
            <div className="relative">
                {session && (
                    <>
                        <button
                            onClick={() => setShowdropdown(!showdropdown)}
                            onBlur={() => {
                                setTimeout(() => setShowdropdown(false), 100);
                            }}
                            id="dropdownDefaultButton"
                            data-dropdown-toggle="dropdown"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none mx-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="button"
                        >
                            Welcome {session.user.email.split("@")[0]}
                            <svg
                                className="w-2.5 h-2.5 ms-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 4 4 4-4"
                                />
                            </svg>
                        </button>

                        <div
                            id="dropdown"
                            className={`z-10 absolute left-[125px] ${
                                showdropdown ? "" : "hidden"
                            } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                        >
                            <ul
                                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownDefaultButton"
                            >
                                <li>
                                    <Link
                                        href="/dashboard"
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={`/${
                                            session.user.name ||
                                            session.user.email.split("@")[0]
                                        }`}
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        Your Page
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        onClick={() => {
                                            signOut();
                                        }}
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        Sign out
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </>
                )}

                {!session && (
                    <Link href={"/login"}>
                        <button
                            type="button"
                            className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
