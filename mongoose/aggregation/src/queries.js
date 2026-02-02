import "dotenv/config.js";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import User from "./model/user.js";
import Post from "./model/post.js";
import Comment from "./model/comment.js";

connectDB();

// Count posts per user (like dashboard stats)

async function countPostsPerUser() {
  try {
    const stats = await Post.aggregate([
      {
        $group: {
          _id: "$author",
          totalPosts: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 0,
          userId: "$user._id",
          fullName: { $concat: ["$user.firstName", " ", "$user.lastName"] },
          email: "$user.email",
          totalPosts: 1,
        },
      },
      { $sort: { totalPosts: -1 } },
    ]);
    console.log(JSON.stringify(stats, null, 2));
    return stats;
  } catch (error) {
    console.log("Error", error);
  }
}

// countPostsPerUser();

// Find top users by total post views

async function userByTotalPostViews() {
  try {
    const stats = await Post.aggregate([
      {
        $group: {
          _id: "$author",
          totalPostViews: { $sum: "$views" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 0,
          userId: "$user._id",
          fullName: { $concat: ["$user.firstName", " ", "$user.lastName"] },
          email: "$user.email",
          totalPostViews: 1,
        },
      },
      {
        $sort: { totalPostViews: -1 },
      },
    ]);
    console.log(JSON.stringify(stats, null, 2));
    return stats;
  } catch (error) {
    console.log("Error: ", error);
  }
}

// userByTotalPostViews();

// Find posts with most comments

async function findPostWithMostComments() {
  try {
    const stats = await Comment.aggregate([
      {
        $group: {
          _id: "$post",
          mostComments: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "_id",
          as: "post",
        },
      },
      {
        $unwind: "$post",
      },
      {
        $project: {
          _id: 0,
          postId: "$post._id",
          title: "$post.title",
          mostComments: 1,
        },
      },
      {
        $sort: { mostComments: -1 },
      },
    ]);
    console.log(JSON.stringify(stats, null, 2));
    return stats;
  } catch (error) {
    console.log("Error: ", error);
  }
}

// findPostWithMostComments();

// List users with all their posts and comments (join collections)

async function listUserPostsAndComments() {
  try {
    const stats = await User.aggregate([
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "author",
          as: "posts",
        },
      },
      {
        $unwind: "$posts",
      },
      {
        $lookup: {
          from: "comments",
          localField: "posts._id",
          foreignField: "post",
          as: "posts.comment",
        },
      },
      {
        $group: {
          _id: "$_id",
          firstName: { $first: "$firstName" },
          email: { $first: "$email" },
          posts: { $push: "$posts" },
        },
      },
    ]);
    console.log(JSON.stringify(stats, null, 2));
    return stats;
  } catch (error) {
    console.log("Error: ", error);
  }
}

// listUserPostsAndComments();

// Aggregate tags popularity across posts

async function aggregateTagsPost() {
  try {
    const stats = await Post.aggregate([
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);
    console.log(JSON.stringify(stats, null, 2));
    return stats;
  } catch (error) {
    console.log("Error: ", error);
  }
}

// aggregateTagsPost();

// Average comments per post per user lets practice this first

async function averageCommentPerPostPerUser() {
  try {
    const stats = await Comment.aggregate([
      {
        $group: {
          _id: "$post",
          totalComments: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "_id",
          as: "postInfo",
        },
      },
      {
        $unwind: "$postInfo",
      },
      {
        $group: {
          _id: "$postInfo.author",
          totalComments: { $sum: "$totalComments" },
          totalPosts: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 1,
          averageComments: { $divide: ["$totalComments", "$totalPosts"] },
        },
      },
    ]);
    console.log(JSON.stringify(stats, null, 2));
    return stats;
  } catch (error) {
    console.log("Error: ", error);
  }
}

// averageCommentPerPostPerUser();

// Total posts, Most popular tags, Average comments per post

async function toFindTotalPostsPopularTagsAverageCommentsPerPost() {
  try {
    const stats = await Post.aggregate([
      {
        $facet: {
          totalPost: [{ $count: "count" }],
          tags: [
            {
              $unwind: "$tags",
            },
            { $group: { _id: "$tags", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
          ],
          avgViews: [{ $group: { _id: null, avgViews: { $avg: "$views" } } }],
        },
      },
    ]);
    console.log(JSON.stringify(stats, null, 2));
    return stats;
  } catch (error) {
    console.log("Error: ", error);
  }
}

// toFindTotalPostsPopularTagsAverageCommentsPerPost();

async function postRange() {
  try {
    const stats = await Post.aggregate([
      {
        $bucket: {
          groupBy: "$views",
          boundaries: [0, 10, 50, 100, 500],
          default: "Other",
          output: {
            count: { $sum: 1 },
            posts: { $push: "$title" },
          },
        },
      },
    ]);
    console.log(JSON.stringify(stats, null, 2));
    return stats;
  } catch (error) {
    console.log("Error: ", error);
  }
}

postRange();
