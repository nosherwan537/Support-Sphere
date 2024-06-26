"use client";
import React, { useEffect, useState } from "react";
import "../utility.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchuser, updateProfile } from "@/actions/useractions";

const Dashboard = () => {
    const { data: session, update } = useSession();
    const router = useRouter();
    const [form, setForm] = useState({});

    useEffect(() => {
        if (session) {
            getData();
        } else {
            router.push("/login");
        }
    }, [router, session]);

    const getData = async () => {
        try {
            const username =
                session.user.name || session.user.email.split("@")[0]; // Adjust according to your session object
            let u = await fetchuser(username);
            setForm(u);
        } catch (error) {
            console.error(error);
            alert("Failed to fetch user data");
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        try {
            let response = await updateProfile(
                new FormData(e.target),
                session.user.name
            );
            if (response.error) {
                alert(response.error);
            } else {
                alert("Profile Updated");
                update(); // Update the session if necessary
            }
        } catch (error) {
            console.error(error);
            alert("Failed to update profile");
        }
    };

    return (
        <div className="flex flex-col items-center space-y-2 justify-center jersey-25-regular">
            <h1>Dashboard</h1>
            <p>Info</p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                <input
                    type="text"
                    className="rounded-lg p-3 text-black"
                    placeholder="Name"
                    name="name"
                    value={form.name || ""}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    className="rounded-lg p-3 text-black"
                    placeholder="Email"
                    name="email"
                    value={form.email || ""}
                    onChange={handleChange}
                />
                <input
                    type="tel"
                    className="rounded-lg p-3 text-black"
                    placeholder="Phone"
                    name="phone"
                    value={form.phone || ""}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    className="rounded-lg p-3"
                    placeholder="Nationality"
                    name="nationality"
                    value={form.nationality || ""}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    className="rounded-lg p-3"
                    placeholder="Profile Pic URL"
                    name="profilePic"
                    value={form.profilePic || ""}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    className="rounded-lg p-3"
                    placeholder="Cover Pic URL"
                    name="coverPic"
                    value={form.coverPic || ""}
                    onChange={handleChange}
                />
                <button type="submit" className="bg-slate-600 rounded-lg p-4">
                    UPDATE
                </button>
            </form>
        </div>
    );
};

export default Dashboard;
