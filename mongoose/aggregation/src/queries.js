import "dotenv/config.js";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import User from "./model/user.js";
import Post from "./model/post.js";
import Comment from "./model/comment.js";

connectDB();
