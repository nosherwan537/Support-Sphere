"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "../utility.css";

const Username = ({ params }) => {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session) {
            router.push("/login");
        }
    }, [session, router]);

    return (
        <>
            {params.username}
            <div className="min-h-screen flex flex-col items-center">
                <div className="flex justify-center mt-2">
                    <Image
                        src={
                            session?.user?.coverPic ||
                            "/resources/batman-1.avif"
                        }
                        alt="Cover Image"
                        width={800}
                        height={300}
                        className="rounded-lg"
                    />
                </div>
                <div className="text-white flex flex-col justify-center items-center text-center p-2 montserrat-regular text-lg w-full">
                    <div className="mb-4">
                        <Image
                            src={
                                session?.user?.profilePic ||
                                "/resources/joke.jpg"
                            }
                            alt="Profile Image"
                            width={100}
                            height={100}
                            className="rounded-full"
                        />
                    </div>
                    <h1>Welcome {params.username}</h1>
                    <div className="my-2 flex md:flex-row flex-col md:gap-60 gap-20 ">
                        <div className="container w-72 supporters bg-gradient-to-r from-gray-300 to-sky-900 rounded-xl p-4">
                            <h1 className="font-bold ">Supporter 1</h1>
                            <p className="text-slate-200">
                                Donated 1000 yesterday!!!
                            </p>
                            <h1 className="font-bold">Supporter 2</h1>
                            <p className="text-slate-200">
                                Donated 3000 yesterday!!!
                            </p>
                            <h1 className="font-bold ">Supporter 3</h1>
                            <p className="text-slate-200">
                                Donated 100 yesterday!!!
                            </p>
                        </div>
                        <div className="container w-72 p-4 bg-gradient-to-r from-gray-300 to-sky-900 rounded-xl">
                            <h1 className="text-center mb-4 text-xl font-bold">
                                Donate
                            </h1>
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    className="rounded-xl p-1 w-full text-black"
                                    placeholder="Name"
                                />
                                <input
                                    type="text"
                                    className="rounded-xl p-1 w-full text-black"
                                    placeholder="Amount"
                                />
                                <input
                                    type="text"
                                    className="rounded-xl p-1 w-full text-black"
                                    placeholder="Card Number"
                                />
                                <button className="bg-slate-600 rounded-lg p-1">
                                    Donate
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Username;
