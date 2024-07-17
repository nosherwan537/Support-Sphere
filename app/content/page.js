"use client";
import { useState } from "react";

export default function Home() {
    const [interests, setInterests] = useState("");
    const [preferences, setPreferences] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const response = await fetch("/api/recommend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ interests, preferences }),
        });

        const data = await response.json();
        setResults(data);
        setLoading(false);
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center text-black">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-4 text-center">
                    YouTube Channel Recommender
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="interests"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Interests:
                        </label>
                        <input
                            type="text"
                            id="interests"
                            value={interests}
                            onChange={(e) => setInterests(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="preferences"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Preferred Country:
                        </label>
                        <input
                            type="text"
                            id="preferences"
                            value={preferences}
                            onChange={(e) => setPreferences(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="inline-block w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {loading ? "Loading..." : "Get Recommendations"}
                    </button>
                </form>
                {results.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-xl font-bold mb-4">
                            Recommended YouTube Channels:
                        </h2>
                        {results.map((channel, index) => (
                            <div
                                key={index}
                                className="bg-gray-200 p-4 rounded-lg mb-4"
                            >
                                <h3 className="text-lg font-semibold mb-2">
                                    {channel.name}
                                </h3>
                                <img
                                    src={channel.thumbnail}
                                    alt={channel.name}
                                    className="max-w-full mb-2 rounded-lg shadow-lg"
                                />
                                <p className="text-sm text-gray-700">
                                    {channel.description}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
