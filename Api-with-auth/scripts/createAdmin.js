const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../models/userModel");
const config = require("../config/config");

const createAdmin = async () => {
    try {
        const email = process.argv[2] || process.env.ADMIN_EMAIL;
        const password = process.argv[3] || process.env.ADMIN_PASSWORD;

        if (!email || !password) {
            throw new Error(
                "Email and password are required" 
            );
        }

        await mongoose.connect(config.mongoURI);

        const existingAdmin = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (existingAdmin) {
            throw new Error("User with this email already exists");
        }

        await User.create({
            email,
            password,
            username: process.env.ADMIN_USERNAME || email.split("@")[0],  
            role: "admin"
        });

        console.log("Admin successfully created");
    } catch (error) {
        console.error("Admin creation failed:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

createAdmin();