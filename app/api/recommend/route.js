import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { google } from "googleapis";
import { NextResponse } from "next/server";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const youtube = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_API_KEY,
});

export async function POST(request) {
    if (request.method !== "POST") {
        return NextResponse.json(
            { error: "Method not allowed" },
            { status: 405 }
        );
    }

    let body;
    try {
        body = await request.json(); // Parse the request body
    } catch (error) {
        return NextResponse.json(
            { error: "Invalid request body" },
            { status: 400 }
        );
    }

    const { interests, preferences } = body;

    // Validate user input
    if (!interests || !preferences) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }
    try {
        const prompt = `Based on the user's interests of ${interests} and country ${preferences}, recommend a list of just top three YouTube channels that cater to these interests. Prioritize channels that have most subscribers
        and are most popular recently in the country as per your knowledge. Take in account their viewership and engagement metrics.Keep in mind your response is being used as recommendation for a user who is using my app and my app uses you as gemini api ..so be responsible and do answer whatever..
        and only bold thing in your response must be channel name and nothing else`;

        const generativeModel = await genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });

        const modelResponse = await generativeModel.generateContent(prompt);

        // Log the actual response from the API call
        const responseText = await modelResponse.response.text();
        console.log("API response:", responseText);

        // Extract channel names from the AI response
        const recommendedChannels = extractChannelNames(responseText);

        // Log extracted channel names
        console.log("Extracted channel names:", recommendedChannels);

        // Fetch YouTube channel details using YouTube Data API
        const channelDetails = await fetchYouTubeChannelDetails(
            recommendedChannels
        );

        return NextResponse.json(channelDetails);
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// Function to extract channel names from the AI response
function extractChannelNames(responseText) {
    const channelNames = [];
    const regex = /\*\*(.*?)\*\*/g; // Updated regex to be non-greedy and capture all characters between '**' pairs
    let match;
    while ((match = regex.exec(responseText)) !== null) {
        channelNames.push(match[1].trim());
    }
    return channelNames;
}

// Function to fetch YouTube channel details
async function fetchYouTubeChannelDetails(channelNames) {
    const channelDetails = [];
    for (const name of channelNames) {
        try {
            const response = await youtube.search.list({
                part: "snippet",
                q: name,
                type: "channel",
                maxResults: 1,
            });
            if (response.data.items.length > 0) {
                const channel = response.data.items[0];
                channelDetails.push({
                    name: channel.snippet.title,
                    thumbnail: channel.snippet.thumbnails.default.url,
                    description: channel.snippet.description,
                    channelId: channel.id.channelId,
                });
            }
        } catch (error) {
            console.error(`Error fetching details for channel ${name}:`, error);
        }
    }
    return channelDetails;
}
