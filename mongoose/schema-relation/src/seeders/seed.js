import "dotenv/config.js";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../model/user.js";
import Post from "../model/post.js";
import { usersData, postsData } from "../data/index.js";

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    console.log("Cleared existing data");

    // Create users
    const createdUsers = await User.insertMany(usersData);
    console.log(`${createdUsers.length} users created successfully`);

    // Create posts with author references
    const postsWithAuthors = postsData.map((post, index) => ({
      ...post,
      author: createdUsers[index % createdUsers.length]._id,
    }));

    const createdPosts = await Post.insertMany(postsWithAuthors);
    console.log(`${createdPosts.length} posts created successfully`);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
