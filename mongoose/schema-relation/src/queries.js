import "dotenv/config.js";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import User from "./model/user.js";
import Post from "./model/post.js";

// Connect to database
connectDB();

async function getAllUsers() {
  try {
    const users = await User.find().populate("posts"); // Use await for async
    // console.log(users);
    console.log(JSON.stringify(users, null, 2));
    return users;
  } catch (err) {
    console.error(err);
  }
}

// getAllUsers();

async function getOneUser(userId) {
  try {
    const user = await User.findByUserId(userId);
    console.log(user.fullName);
    console.log(user);
    return user.fullName;
  } catch (error) {
    console.error(error);
  }
}

// getOneUser("698038027c3cb33e193835c0");

async function getActiveUsers() {
  try {
    const users = await User.find().active();
    console.log(users);
    return users;
  } catch (error) {
    console.error(error);
  }
}

// getActiveUsers();

async function deleteUserById(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) return console.log("User not found");

    await user.deleteOne();
    console.log(`User with ID ${userId} deleted successfully`);
  } catch (error) {
    console.error(error);
  }
}

deleteUserById("6980527a9e36def50a312829");
