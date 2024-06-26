"use server";
import connectDB from "@/db/connectDb";
import User from "@/models/User";

export const fetchuser = async (username) => {
    await connectDB();
    try {
        let u = await User.findOne({ username: username });
        if (!u) {
            throw new Error("User not found");
        }
        let user = u.toObject({ flattenObjectIds: true });
        return user;
    } catch (error) {
        console.error("Fetch User Error:", error);
        return { error: error.message };
    }
};

export const updateProfile = async (data, oldusername) => {
    await connectDB();
    try {
        let ndata = Object.fromEntries(data.entries());

        if (oldusername !== ndata.username) {
            let existingUser = await User.findOne({ username: ndata.username });
            if (existingUser) {
                return { error: "Username already exists" };
            }
        }

        let result = await User.updateOne({ username: oldusername }, ndata);
        if (result.nModified === 0) {
            return { error: "Profile update failed" };
        }
        return { success: true };
    } catch (error) {
        console.error("Update Profile Error:", error);
        return { error: error.message };
    }
};
