import "dotenv/config.js";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import User from "./model/user.js";
import Post from "./model/post.js";

// Connect to database
connectDB();

async function getAllUsers() {
  try {
    const users = await User.find(); // Use await for async
    console.log(users);
    return users;
  } catch (err) {
    console.error(err);
  }
}

getAllUsers();
