import "dotenv/config.js";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../model/user.js";
import Post from "../model/post.js";
import Comment from "../model/comment.js";
import { usersData, postsData, commentsData } from "../data/index.js";

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    console.log("Cleared existing data");

    // Create users
    const createdUsers = await User.insertMany(usersData);
    console.log(`${createdUsers.length} users created successfully`);

    // Create posts with author references (distribute posts among users)
    // User 0 (John) - 3 posts
    // User 1 (Jane) - 3 posts
    // User 2 (Robert) - 2 posts
    // User 3 (Emily) - 1 post
    // User 4 (Michael) - 2 posts
    // User 5 (Sarah) - 1 post
    const postAuthors = [0, 0, 0, 1, 1, 1, 2, 2, 3, 4, 4, 5];

    const postsWithAuthors = postsData.map((post, index) => ({
      ...post,
      author: createdUsers[postAuthors[index]]._id,
    }));

    const createdPosts = await Post.insertMany(postsWithAuthors);
    console.log(`${createdPosts.length} posts created successfully`);

    // Create comments with post and author references
    // Distribute comments across posts (each post gets multiple comments)
    const commentsWithReferences = commentsData.map((comment, index) => {
      // Distribute comments across all posts
      const postIndex = index % createdPosts.length;
      // Random user as comment author
      const authorIndex = index % createdUsers.length;

      return {
        ...comment,
        post: createdPosts[postIndex]._id,
        author: createdUsers[authorIndex]._id,
      };
    });

    const createdComments = await Comment.insertMany(commentsWithReferences);
    console.log(`${createdComments.length} comments created successfully`);

    // Show statistics
    console.log("\n========== Database Statistics ==========");
    console.log(`Total Users: ${createdUsers.length}`);
    console.log(`Total Posts: ${createdPosts.length}`);
    console.log(`Total Comments: ${createdComments.length}`);

    // Show posts per user
    for (const user of createdUsers) {
      const userPosts = createdPosts.filter(
        (post) => post.author.toString() === user._id.toString(),
      );
      console.log(
        `${user.firstName} ${user.lastName}: ${userPosts.length} posts`,
      );
    }

    console.log("\nDatabase seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
